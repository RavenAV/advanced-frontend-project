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
import { VStack } from "@/shared/ui/deprecated/Stack";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon";
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'

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

    const itemsList = useMemo(() => {
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
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsedRedesigned]: collapsed }, [className])}
                >
                    <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50}/>
                    <VStack className={cls.items} role="navigation" gap={'8'}>
                        {itemsList}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LanguageSwitcher
                            className={cls.language}
                            short={collapsed}
                        />
                    </div>
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
                        className={cls.collapseBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack className={cls.items} role="navigation" gap={'8'}>
                        {itemsList}
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