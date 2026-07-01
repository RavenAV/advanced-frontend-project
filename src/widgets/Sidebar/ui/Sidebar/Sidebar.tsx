import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import { useMemo, useState } from "react";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LanguageSwitcher } from "@/features/LanguageSwither";
import { Button, ButtonSize, ButtonTheme } from "../../../Button/ui/Button";
import { useTranslation } from "react-i18next";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { useSelector } from "react-redux";
import { VStack } from "@/shared/ui/Stack";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLogo } from "@/shared/ui/AppLogo";


interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const sidebarItemsList = useSelector(getSidebarItems)
    const { t } = useTranslation()

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    const ItemsList = useMemo(() => {
        return sidebarItemsList.map((item) => (
            <SidebarItem
                key={item.path}
                item={item}
                collapsed={collapsed}
            />
        ))
    }, [collapsed, sidebarItemsList])

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <aside
                    data-testid="sidebar"
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}
                >
                    <AppLogo className={cls.appLogo} />
                </aside> 
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapsedBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack className={cls.items} role="navigation" gap={'8'}>
                        {ItemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LanguageSwitcher
                            className={cls.language}
                            short={collapsed}
                        />
                    </div>
                </aside>
            }
        />
    )
}