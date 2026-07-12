import { memo, SVGProps } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './Icon.module.scss'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconBaseProps extends IconBaseProps {
    clickable?: false
}

interface ClickableIconBaseProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

type IconProps = NonClickableIconBaseProps | ClickableIconBaseProps

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    )

    if (clickable) {
        return (
            <button
                onClick={props.onClick}
                type="button"
                className={cls.button}
                style={{ width, height }}
            >
                {icon}
            </button>
        )
    }

    return icon
})