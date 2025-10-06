import { classNames } from "shared/lib/classNames/classNames"
import cls from './LoginForm.module.scss'
import { useTranslation } from "react-i18next"
import { Button } from "widgets/Button/ui/Button"
import { Input } from "shared/ui/Input/Input"

interface LoginFormProps {
    className?: string
}

export const LoginForm = (props: LoginFormProps) => {
    const { t } = useTranslation()
    return (
        <div className={classNames(cls.LoginForm, {}, [props.className])}>
            <Input
                className={cls.input}
                placeholder={t('enter-username')}
                autoFocus={true}
            />
            <Input
                className={cls.input}
                placeholder={t('enter-password')}
            />
            <Button
                className={cls.loginBtn}>
                {t('sign-in')}
            </Button>
        </div>
    )
}