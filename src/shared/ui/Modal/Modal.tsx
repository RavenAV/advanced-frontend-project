import { classNames } from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "shared/ui/Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose
    } = props

    const [isClose, setIsClose] = useState<boolean>(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const {theme} = useTheme() // временное решение!

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClose]: isClose,
        [cls[theme]]: true
    }

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClose(true)
            // поместили в ref, потому что если модальное окно по какой-то причине демонтируется из дом-дерева, то сохраним ссылку на таймер если он отработает
            // => не будет ошибки
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClose(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            // очистка таймера в случае падения компонента при его демонтировании
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
