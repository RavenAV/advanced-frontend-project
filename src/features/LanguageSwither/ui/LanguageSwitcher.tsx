import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './LanguageSwitcher.module.scss'
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Button as ButtonDeprecated, ButtonTheme } from "@/widgets/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui/redesigned/Button";

interface LanguageSwitcherProps {
    className?: string,
    short?: boolean
}

export const LanguageSwitcher = memo(({ className, short }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    //className={classNames(cls.LanguageSwitcher, {}, [className])}
                    variant={'clear'}
                    onClick={toggle}
                >
                    {t(short ? 'short-language' : 'language')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames(cls.LanguageSwitcher, {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}>
                    {t(short ? 'short-language' : 'language')}
                </ButtonDeprecated>
            }
        />
        
    )
})