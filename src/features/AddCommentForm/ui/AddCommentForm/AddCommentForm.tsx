import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import cls from './AddCommentForm.module.scss'
import { classNames } from "shared/lib/classNames/classNames"
import { Input } from "shared/ui/Input/Input"
import { Button } from "widgets/Button/ui/Button"
import { useSelector } from "react-redux"
import { getAddCommentFormError, getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

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
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    placeholder={t('enter-comment')}
                    className={cls.input}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button onClick={onSendHandler}>{t('send')}</Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default AddCommentForm