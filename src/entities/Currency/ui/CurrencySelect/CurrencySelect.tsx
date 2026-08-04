import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";


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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <ListBox
                    className={classNames('', {}, [className])}
                    defaultValue={t('currency')}
                    label={t('currency')}
                    items={options}
                    value={value}
                    onChange={onChangeHandler}
                    readonly={readOnly}
                    direction="top right"
                />
            }
            off={
                <ListBoxDeprecated
                    className={className}
                    defaultValue={t('currency')}
                    label={t('currency')}
                    items={options}
                    value={value}
                    onChange={onChangeHandler}
                    readonly={readOnly}
                    direction="top right"
                />
            }
        />        
    )
})