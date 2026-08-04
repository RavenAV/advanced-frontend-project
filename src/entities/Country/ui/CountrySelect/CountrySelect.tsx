import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Country } from "../../model/types/country";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

interface CountrySelectProps {
    className?: string
    value?: string
    onChange?: (value: Country) => void
    readOnly?: boolean
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Germany, content: Country.Germany },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.USA, content: Country.USA },
    { value: Country.Ukraine, content: Country.Ukraine }
]

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { t } = useTranslation()
    const {
        className,
        value,
        onChange,
        readOnly
    } = props

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [])

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <ListBox
                    className={classNames('', {}, [className])}
                    defaultValue={t('country')}
                    label={t('country')}
                    items={options}
                    value={value}
                    onChange={onChangeHandler}
                    readonly={readOnly}
                    direction="top right"
                />
            }
            off={
                <ListBoxDeprecated
                    className={classNames('', {}, [className])}
                    defaultValue={t('country')}
                    label={t('country')}
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