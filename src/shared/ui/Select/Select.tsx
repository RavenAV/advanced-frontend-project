import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import { memo, useMemo } from "react";

export interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    readOnly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readOnly
    } = props

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            key={opt.value}
            value={opt.value}
        >
            {opt.content}
        </option>
    )), [options])

    const mods: Mods = {

    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label &&
                (
                    <span className={cls.label}>
                        {label + '>'}
                    </span>
                )}
            <select disabled={readOnly} className={cls.select} value={value} onChange={onChangeHandler}>
                {optionsList}
            </select>
        </div>
    )
})