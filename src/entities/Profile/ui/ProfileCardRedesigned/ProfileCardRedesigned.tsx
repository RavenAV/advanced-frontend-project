import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import { Input } from "@/shared/ui/redesigned/Input";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/redesigned/Card";
import { useTranslation } from "react-i18next";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card padding="24" max>
            <VStack gap={'32'}>
                <HStack max justify="center">
                    <Skeleton border="100%" width={128} height={128} />
                </HStack>

                <HStack gap="32" max>
                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>

                    <VStack gap={'16'} max>
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                        <Skeleton width={'100%'} height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    )
}

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation()

    return (
        <HStack justify="center" max>
            <Text
                text={t('try-refresh-page')}
                title={t('profile-error')}
                variant={'error'}
                align={'center'}
            />
        </HStack>
    )
}

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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

    return (
        <Card
            max
            className={classNames('', {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                {data?.avatar &&
                    <HStack justify="center" max>
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                }
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.firstName}
                            label="Имя:"
                            onChange={onChangeFirstName}
                            readOnly={readOnly}
                            data-testid="ProfileCard.firstName"
                        />

                        <Input
                            value={data?.lastName}
                            label="Фамилия:"
                            onChange={onChangeLastName}
                            readOnly={readOnly}
                            data-testid="ProfileCard.lastName"
                        />

                        <Input
                            value={data?.age}
                            label={t('age') + ':'}
                            onChange={onChangeAge}
                            readOnly={readOnly}
                            data-testid="ProfileCard.age"
                        />

                        <Input
                            value={data?.city}
                            label={t('city') + ':'}
                            onChange={onChangeCity}
                            readOnly={readOnly}
                            data-testid="ProfileCard.city"
                         />
                    </VStack>
                        <VStack gap="16" max>
                        <Input
                            value={data?.username}
                            label={t('username') + ':'}
                            onChange={onChangeUsername}
                            readOnly={readOnly}
                            data-testid="ProfileCard.username"
                        />

                        <Input
                            value={data?.avatar}
                            label={t('avatar') + ':'}
                            onChange={onChangeAvatar}
                            readOnly={readOnly}
                            data-testid="ProfileCard.avatar"
                        />

                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readOnly={readOnly}
                        />

                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readOnly={readOnly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    )
}