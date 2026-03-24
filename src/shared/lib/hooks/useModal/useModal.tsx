import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface UseModalProps {
    onClose?: () => void
    isOpen?: boolean
    animationDelay: number
}

export function useModal(props: UseModalProps) {
    const {
        onClose,
        isOpen,
        animationDelay
    } = props

    const [isClose, setIsClose] = useState<boolean>(false)
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const close = useCallback(() => {
        if (onClose) {
            setIsClose(true)
            // поместили в ref, потому что если модальное окно по какой-то причине демонтируется из дом-дерева, то сохраним ссылку на таймер если он отработает
            // => не будет ошибки
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClose(false)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close()
        }
    }, [close])

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

    return {
        isClose,
        isMounted,
        close
    }
}