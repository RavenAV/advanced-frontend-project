import { classNames } from "shared/lib/classNames/classNames"
import cls from './LoginForm.module.scss'
import { useTranslation } from "react-i18next"
import { Button, ButtonTheme } from "widgets/Button/ui/Button"
import { Input } from "shared/ui/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { memo, useCallback } from "react"
import { loginActions } from "../../model/slice/loginSlice"
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState"
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername"
import { Text, TextTheme } from "shared/ui/Text/Text"

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo((props: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { username, password, isLoading, error } = useSelector(getLoginState)

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))

    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))

    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))

    }, [dispatch, username, password])

    return (
        <div className={classNames(cls.LoginForm, {}, [props.className])}>
            <Text title={t('authorization-form')} />
            {error && <Text text={t('auth-error')} theme={TextTheme.ERROR} />}
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
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('sign-in')}
            </Button>
        </div>
    )
})