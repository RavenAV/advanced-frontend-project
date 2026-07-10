import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string
    onClick?: () => void
}

/**
 * Устарел, используются новые компоненты из папки redesigned
 * @deprecated
 */
// отвечает за бекграунд модального окна - затемнение
export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props

    return (
        <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
    )
})
