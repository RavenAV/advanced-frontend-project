import cls from './ProfilePageHeader.module.scss'
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from 'widgets/Button/ui/Button';
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text"
import { getProfileData, getProfileReadOnly, profileActions, updateProfileData } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation()
    const readOnly = useSelector(getProfileReadOnly)
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const canEdit = authData?.id === profileData?.id

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <div
            className={classNames(cls.ProfilePageHeader, {}, [className])}
        >
            <Text title={t('profile')} />
            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readOnly ?
                        (
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                                className={cls.editBtn}>
                                {t('edit')}
                            </Button>
                        )
                        : (
                            <>
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                    className={cls.editBtn}>
                                    {t('cancel')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                    className={cls.saveBtn}>
                                    {t('save')}
                                </Button>
                            </>
                        )
                    }
                </div>
            )}
        </div>
    )
}