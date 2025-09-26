import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "widgets/Button/ui/Button";
import { Modal } from "shared/ui/Modal/Modal";
import { useCallback, useState } from "react";

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => (!prev))
    }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('sign-in')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Роман самого знаменитого автора современной японской прозы, главная литературная сенсация нового века, «магнум-опус прославленного мастера» и «обязательное чтение для любого, кто хочет разобраться в японской культуре наших дней». Действие книги происходит не столько в тысяча девятьсот восемьдесят четвертом году, сколько в тысяча невестьсот восемьдесят четвертом, в мире, где некоторые видят на небе две луны, где ключом к вечной любви служит Симфониетта Яначека, где полицейских после всколыхнувшей всю страну перестрелки с сектантами перевооружили автоматическими пистолетами взамен револьверов, где LittlePeople — Маленький Народец — выходит изо рта мертвой козы и плетет Воздушный Кокон.
            </Modal>
        </div>
    )
}
