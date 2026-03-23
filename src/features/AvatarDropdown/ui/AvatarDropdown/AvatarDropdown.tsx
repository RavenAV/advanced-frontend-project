import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Dropdown } from 'shared/ui/Popups';
import { useDispatch, useSelector } from 'react-redux';
import cls from './AvatarDropdown.module.scss';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { RoutePath } from 'shared/config/routerConfig/routerConfig';

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
        return null;
    }

    return (
        <Dropdown
            direction="bottom left"
            className={classNames(cls.AvatarDropdown, {}, [className])}

            trigger={
                <Avatar size={30} src={authData.avatar} />
            }
            items={[
                // обернули массив в скобки, внутри них будет условие, и это массив за пределами скобок разворачиваем
                // т.е. если условие выполняется, то возвращаем массив с 1м элементом, иначе пустой массив
                ...(isAdminPanelAvailable ? [{
                    content: t('admin-btn'),
                    href: RoutePath.admin_panel
                }] : []),
                {
                    content: t('profile'),
                    href: RoutePath.profile + authData.id
                },
                {
                    content: t('log-out'),
                    onClick: onLogout
                }
            ]}
        />
    )
})
