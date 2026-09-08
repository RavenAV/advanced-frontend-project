import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './LoginForm.module.scss'
import { useTranslation } from "react-i18next"
import { Button as ButtonDeprecated, ButtonTheme } from "@/widgets/Button"
import { Input } from "@/shared/ui/redesigned/Input"
import { useSelector } from "react-redux"
import { memo, useCallback } from "react"
import { loginActions, loginReducer } from "../../model/slice/loginSlice"
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername"
import { Text as TextDeprecated, TextTheme } from "@/shared/ui/deprecated/Text"
import { Text } from "@/shared/ui/redesigned/Text"
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername"
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword"
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError"
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading"
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { ToggleFeatures } from "@/shared/lib/features"
import { Button } from "@/shared/ui/redesigned/Button"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { useForceUpdate } from "@/shared/lib/render/forceUpdate"

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginIsLoading)

    const forceUpdate = useForceUpdate()

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))

    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))

    }, [dispatch])

    const onLoginClick = useCallback(async () => {
        const res = await dispatch(loginByUsername({ username, password }))
        if (res.meta.requestStatus === 'fulfilled') {
            onSuccess()
            forceUpdate()
        }

    }, [onSuccess, dispatch, username, password, forceUpdate])

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <VStack gap={'16'} className={classNames(cls.LoginForm, {}, [className])}>
                        <Text title={t('authorization-form')} />
                        
                        {error && <Text text={t('auth-error')} variant={'error'} />}
                        
                        <Input
                            className={cls.input}
                            placeholder={t('enter-username')}
                            autoFocus={true}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        
                        <Input
                            className={cls.input}
                            placeholder={t('enter-password')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        
                        <Button
                            variant={'outline'}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('sign-in')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('authorization-form')} />
                        {error && <TextDeprecated text={t('auth-error')} theme={TextTheme.ERROR} />}
                        <Input
                            className={cls.input}
                            placeholder={t('enter-username')}
                            autoFocus={true}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            className={cls.input}
                            placeholder={t('enter-password')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('sign-in')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>

    )
})

export default LoginForm