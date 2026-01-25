import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadOnly, getProfileValidateErrors, profileActions, ProfileCard, profileReducer, ValidateProfileError } from "entities/Profile"
import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useSelector } from "react-redux"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"
import { TextTheme, Text } from "shared/ui/Text/Text"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useParams } from "react-router-dom"
import { Page } from "shared/ui/Page/Page"

const reducers: ReducersList = {
    profile: profileReducer
}
interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const form = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const isLoading = useSelector(getProfileIsLoading)
    const readOnly = useSelector(getProfileReadOnly)
    const validateErrors = useSelector(getProfileValidateErrors)
    const { id } = useParams<{ id: string }>()

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('incorrect-user-data'),
        [ValidateProfileError.INCORRECT_AGE]: t('incorrect-age'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('incorrect-country'),
        [ValidateProfileError.NO_DATA]: t('no-data'),
        [ValidateProfileError.SERVER_ERROR]: t('server-error')
    }

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ firstName: value || '' }))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastName: value || '' }))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }))
    }, [dispatch])

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }))
    }, [dispatch])

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {
                    validateErrors?.length && validateErrors.map((err: ValidateProfileError) => (
                        <Text
                            key={err}
                            text={validateErrorTranslates[err]}
                            theme={TextTheme.ERROR}
                        />
                    ))
                }
                <ProfileCard
                    data={form}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readOnly={readOnly}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ProfilePage