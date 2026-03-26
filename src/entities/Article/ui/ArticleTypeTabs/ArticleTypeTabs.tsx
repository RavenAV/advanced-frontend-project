import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleType } from "@/entities/Article/model/consts/consts";
import { classNames } from "@/shared/lib/classNames/classNames";
import { TabItem, Tabs } from "@/shared/ui/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string
    value: ArticleType

    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { t } = useTranslation()
    const {
        className,
        value,
        onChangeType
    } = props

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('all'),
        },
        {
            value: ArticleType.IT,
            content: t('it'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('science'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('economics'),
        }
    ], [t])

    const onChangeTab = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType)
    }, [])

    return (
        <Tabs
            className={classNames('', {}, [className])} tabs={typeTabs}
            value={value}
            onTabClick={onChangeTab}
        />
    )
})