import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import cls from './Avatar.module.scss'
import { CSSProperties, useMemo } from "react"
import UserIcon from '@/shared/assets/icons/user-filled.svg'
import { Icon } from "../../Icon"
import { AppImage } from "../../../redesigned/AppImage"
import { Skeleton } from "../../Skeleton"

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    fallbackInverted?: boolean
}

/**
 * Устарел, используются новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
        fallbackInverted
    } = props

    const mods: Mods = {
    }

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size
    }), [size])

    const fallback = <Skeleton width={size} height={size} border="50%" />
    const errorFallback = <Icon inverted={fallbackInverted} Svg={UserIcon} width={size} height={size} />

    return (
        <AppImage
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    )
}