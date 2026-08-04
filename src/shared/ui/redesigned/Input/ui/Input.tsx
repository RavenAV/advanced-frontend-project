import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import cls from './Input.module.scss'
import { InputHTMLAttributes, memo, ReactNode, useEffect, useRef, useState } from "react"
import { HStack } from "../../Stack"
import { Text } from "../../Text"

// Omit позволяет забрать из типа все пропсы, при этом исключив некоторые
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>
type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    label?: string
    autoFocus?: boolean
    readOnly?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
    size?: InputSize

    onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        label,
        placeholder,
        autoFocus,
        readOnly,
        addonLeft,
        addonRight,
        size = 'm',
        ...otherProps
    } = props

    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autoFocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const mods: Mods = {
        [cls.readOnly]: readOnly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }

    const input = (
        <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readOnly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    )

    if (label) {
        return (
            <HStack max gap={'8'}>
                <Text text={label} />
                {input}
            </HStack>
        )
    }

    return input
})