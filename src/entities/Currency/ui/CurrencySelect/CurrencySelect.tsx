import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { Select } from "shared/ui/Select/Select";


interface CurrencySelectProps {
    className?: string
    value?: string
    onChange?: (value: Currency) => void
    readOnly?: boolean
}

const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { t } = useTranslation()
    const {
        className,
        value,
        onChange,
        readOnly
    } = props

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [])

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('currency')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readOnly={readOnly}
        />
    )
})