import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { useDispatch, useSelector } from 'react-redux';
import cls from './AvatarDropdown.module.scss';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const authData = useSelector(getUserAuthData)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [])

    const isAdminPanelAvailable = isAdmin || isManager

    if (!authData) {
        return null
    }

    console.log(isAdminPanelAvailable)
    console.log(authData)

    const items = [
        // обернули массив в скобки, внутри них будет условие, и это массив за пределами скобок разворачиваем
        // т.е. если условие выполняется, то возвращаем массив с 1м элементом, иначе пустой массив
        ...(isAdminPanelAvailable ? [{
            content: t('admin-btn'),
            href: getRouteAdminPanel()
        }] : []),
        {
            content: t('settings'),
            href: getRouteSettings()
        },
        {
            content: t('profile'),
            href: getRouteProfile(authData.id)
        },
        {
            content: t('log-out'),
            onClick: onLogout
        }
    ]

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <Dropdown
                    direction="bottom left"
                    className={classNames(cls.AvatarDropdown, {}, [className])}

                    trigger={
                        <Avatar size={40} src={authData.avatar} />
                    }
                    items={items}
                /> 
            }
            off={
                <DropdownDeprecated
                    direction="bottom left"
                    className={classNames(cls.AvatarDropdown, {}, [className])}

                    trigger={
                        <AvatarDeprecated size={30} src={authData.avatar} fallbackInverted={true} />
                    }
                    items={items}
                />
            }
        />
    )
})
