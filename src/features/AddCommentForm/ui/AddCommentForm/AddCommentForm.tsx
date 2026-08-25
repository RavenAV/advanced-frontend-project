import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import cls from './AddCommentForm.module.scss'
import { classNames } from "@/shared/lib/classNames/classNames"
import { Input } from "@/shared/ui/redesigned/Input"
import { Button as ButtonDeprecated } from "@/widgets/Button"
import { useSelector } from "react-redux"
import { getAddCommentFormError, getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice"
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { HStack } from "@/shared/ui/redesigned/Stack"
import { ToggleFeatures } from "@/shared/lib/features"
import { Button } from "@/shared/ui/redesigned/Button"
import { Card } from "@/shared/ui/redesigned/Card"

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props
    const { t } = useTranslation()
    const text = useSelector(getAddCommentFormText)
    const error = useSelector(getAddCommentFormError)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch])

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                    <Card padding="24" border="round" max>
                        <HStack justify="between" gap="16" max className={classNames(cls.AddCommentFormRedesigned, {}, [className])} data-testid="AddCommentForm">
                            <Input
                                placeholder={t('enter-comment')}
                                value={text}
                                onChange={onCommentTextChange}
                                data-testid="AddCommentForm.Input"
                            />
                            <Button onClick={onSendHandler} data-testid="AddCommentForm.Button">{t('send')}</Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack justify="between" max className={classNames(cls.AddCommentForm, {}, [className])} data-testid="AddCommentForm">
                        <Input
                            placeholder={t('enter-comment')}
                            className={cls.input}
                            value={text}
                            onChange={onCommentTextChange}
                            data-testid="AddCommentForm.Input"
                        />
                        <ButtonDeprecated onClick={onSendHandler} data-testid="AddCommentForm.Button">{t('send')}</ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    )
})

export default AddCommentForm