import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import { ReactNode } from "react";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Portal } from "../../../redesigned/Portal";
import { Overlay } from "@/shared/ui/redesigned/Overlay";
import { toggleFeatures } from "@/shared/lib/features";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

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
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={
                classNames(cls.Modal, mods, [className, theme, 'app_modal', 
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.modalNew,
                        off: () => cls.modalOld})
                    ]
                )
            }>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
