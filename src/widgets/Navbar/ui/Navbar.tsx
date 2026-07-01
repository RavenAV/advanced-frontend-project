import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/widgets/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "@/features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { Text, TextTheme } from "@/shared/ui/Text";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink";
import { HStack } from "@/shared/ui/Stack";
import { NotificationButton } from "@/features/NotificationButton";
import { AvatarDropdown } from "@/features/AvatarDropdown";
import { getRouteArticleCreate } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/lib/features";

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    if (authData) {
        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                        <HStack gap='16' className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(cls.Navbar, {}, [className])}>
                        <Text
                            className={cls.appName}
                            text='CrazyGenius site ^.^'
                            theme={TextTheme.INVERTED}
                        />
                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                            className={cls.createBtn}
                        >
                            {t('create-article')}
                        </AppLink>
                        <HStack gap='16' className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('sign-in')}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    )
})
