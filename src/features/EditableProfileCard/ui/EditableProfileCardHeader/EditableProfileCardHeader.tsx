import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button as ButtonDeprecated, ButtonTheme } from '@/widgets/Button/ui/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text"
import { Text } from "@/shared/ui/redesigned/Text"
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from "@/shared/ui/redesigned/Stack";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { ToggleFeatures } from "@/shared/lib/features";
import { Buttons } from "@testing-library/user-event/dist/types/system/pointer/buttons";
import { Card } from "@/shared/ui/redesigned/Card";

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding={'24'} max border={'partial'}>
                    <HStack
                        className={classNames('', {}, [className])}
                        justify={'between'}
                        max
                    >
                        <Text title={t('profile')} />
                        {canEdit && (
                            <div>
                                {readOnly ?
                                    (
                                        <Button
                                            onClick={onEdit}
                                            data-testid={'EditableProfileCardHeader.EditButton'}
                                        >
                                            {t('edit')}
                                        </Button>
                                    )
                                    : (
                                        <HStack gap={'8'}>
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid={'EditableProfileCardHeader.CancelButton'}
                                                color={'error'}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                data-testid={'EditableProfileCardHeader.SaveButton'}
                                                color={'success'}
                                            >
                                                {t('save')}
                                            </Button>
                                        </HStack>
                                    )
                                }
                            </div>
                        )}
                    </HStack>
                </Card>
            }
            off={
                <HStack
                    className={classNames('', {}, [className])}
                    justify={'between'}
                    max
                >
                    <TextDeprecated title={t('profile')} />
                    {canEdit && (
                        <div>
                            {readOnly ?
                                (
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                        data-testid={'EditableProfileCardHeader.EditButton'}
                                    >
                                        {t('edit')}
                                    </ButtonDeprecated>
                                )
                                : (
                                    <HStack gap={'8'}>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid={'EditableProfileCardHeader.CancelButton'}
                                        >
                                            {t('cancel')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onSave}
                                            data-testid={'EditableProfileCardHeader.SaveButton'}
                                        >
                                            {t('save')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )
                            }
                        </div>
                    )}
                </HStack>
            }
        />
    )
}