import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from './Input.module.scss'
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react"

// Omit позволяет забрать из типа все пропсы, при этом исключив некоторые
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    autoFocus?: boolean
    readOnly?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autoFocus,
        readOnly,
        ...otherProps
    } = props

    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const isCaretVisible = isFocused && !readOnly

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autoFocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0)
    }

    const mods: Mods = {
        [cls.readOnly]: readOnly
    }

    return (
        <div className={classNames(cls.InputWrapper, {}, [props.className])}>
            {placeholder &&
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            }

            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readOnly}
                    {...otherProps}
                />

                {
                    isCaretVisible &&
                    <span
                        style={{ left: `${caretPosition * 7}px` }}
                        className={cls.caret} />
                }

            </div>
        </div>
    )
})