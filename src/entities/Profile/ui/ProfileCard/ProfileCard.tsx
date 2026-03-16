import { useTranslation } from "react-i18next"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from './ProfileCard.module.scss'
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { Profile } from "../../model/types/profile"
import { Loader } from "shared/ui/Loader"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Currency, CurrencySelect } from "entities/Currency"
import { Country, CountrySelect } from "entities/Country"
import { HStack, VStack } from "shared/ui/Stack"

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readOnly?: boolean

    onChangeFirstName?: (value?: string) => void
    onChangeLastName?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
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

    if (isLoading) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    text={t('try-refresh-page')}
                    title={t('profile-error')}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </HStack>
        )
    }

    const mods: Mods = {
        [cls.editing]: !readOnly
    }

    // do regular for check that value in number

    return (
        <VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar &&
                <HStack justify="center" max>
                    <Avatar src={data?.avatar} />
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