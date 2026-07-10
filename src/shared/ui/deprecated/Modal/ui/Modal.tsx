import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import { ReactNode } from "react";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Overlay } from "../../Overlay";
import { Portal } from "../../Portal";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

/**
 * Устарел, используются новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy
    } = props

    const {
        close,
        isClose,
        isMounted
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen
    })

    const { theme } = useTheme()

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClose]: isClose
    }

    if (lazy && !isMounted) {
        return null
    }
    // fix closing
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
