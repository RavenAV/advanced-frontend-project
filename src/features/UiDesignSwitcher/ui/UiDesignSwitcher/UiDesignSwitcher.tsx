import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag } from '@/shared/lib/features/lib/setGetFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateFeatureFlags } from '@/shared/lib/features';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props
    const { t } = useTranslation()
    const isAppRedesigned = getFeatureFlag('isAppRedesigned')
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const items = [
        {
            content: t('новый'),
            value: 'new'
        },
        {
            content: t('старый'),
            value: 'old'
        }
    ]

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true)
            await dispatch(updateFeatureFlags({
                userId: authData.id,
                newFeatures: {
                    isAppRedesigned: value === 'new'
                }
            })).unwrap()
            setIsLoading(false)
        }
    }
    
    return (
        <HStack>
            <Text text={t('Вариант интерфейса:')} />
            {isLoading
                ? (
                    <Skeleton width={300} height={40} />
                )
                : (
                    <ListBox
                        value={isAppRedesigned ? 'new' : 'old'}
                        items={items}
                        className={className}
                        onChange={onChange}
                    />
                )
            }
        </HStack>
        
    )
})

