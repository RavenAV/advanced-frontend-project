import { useTranslation } from "react-i18next"
import { ProfileCardProps } from "../ProfileCard/ProfileCard"
import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar"
import { Input } from "@/shared/ui/redesigned/Input"
import { CountrySelect } from "@/entities/Country"
import { CurrencySelect } from "@/entities/Currency"
import { Loader as LoaderDeprecated } from "@/shared/ui/deprecated/Loader"
import { Text as TextDeprecated, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text"
import cls from './ProfileCardDeprecated.module.scss'

export const ProfileCardDeprecatedSkeleton = () => {
    return (
        <HStack justify="center" max className={classNames(cls.ProfileCard, { [cls.loading]: true }, [])}>
            <LoaderDeprecated />
        </HStack>
    )
}

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation()

    return (
        <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [cls.error])}>
            <TextDeprecated
                text={t('try-refresh-page')}
                title={t('profile-error')}
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
            />
        </HStack>
    )
}

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
    const { t } = useTranslation()
    const {
        className,
        data,
        isLoading,
        error,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry
    } = props

    const mods: Mods = {
        [cls.editing]: !readOnly
    }

    return (
        <VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar &&
                <HStack justify="center" max>
                    <AvatarDeprecated src={data?.avatar} />
                </HStack>
            }
            <Input
                value={data?.firstName}
                placeholder="Your name"
                className={cls.input}
                onChange={onChangeFirstName}
                readOnly={readOnly}
                data-testid="ProfileCard.firstName"
            />

            <Input
                value={data?.lastName}
                placeholder="Your surname"
                onChange={onChangeLastName}
                className={cls.input}
                readOnly={readOnly}
                data-testid="ProfileCard.lastName"
            />

            <Input
                value={data?.age}
                placeholder={t('age')}
                onChange={onChangeAge}
                className={cls.input}
                readOnly={readOnly}
                data-testid="ProfileCard.age"
            />

            <Input
                value={data?.city}
                placeholder={t('city')}
                onChange={onChangeCity}
                className={cls.input}
                readOnly={readOnly}
                data-testid="ProfileCard.city"
            />

            <Input
                value={data?.username}
                placeholder={t('username')}
                onChange={onChangeUsername}
                className={cls.input}
                readOnly={readOnly}
                data-testid="ProfileCard.username"
            />

            <Input
                value={data?.avatar}
                placeholder={t('avatar')}
                onChange={onChangeAvatar}
                className={cls.input}
                readOnly={readOnly}
                data-testid="ProfileCard.avatar"
            />

            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readOnly={readOnly}
            />

            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readOnly={readOnly}
            />
        </VStack>
    )
}