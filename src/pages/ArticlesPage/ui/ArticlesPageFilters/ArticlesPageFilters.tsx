import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './ArticlesPageFilters.module.scss'
import { Input } from "@/shared/ui/redesigned/Input"
import { Card } from "@/shared/ui/deprecated/Card"
import { ArticleSortSelector } from "@/features/ArticleSortSelector"
import { ArticleViewSelector } from "@/features/ArticleViewSelector"
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs"
import { useArticleFilters } from "../../lib/hooks/useArticleFilters"

interface ArticlesPageFiltersProps {
    className?: string
}

const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { t } = useTranslation()
    const { className } = props
    const { 
        search,
        sort,
        order,
        view,
        type,
        onChangeOrder,
        onChangeSort,
        onChangeView,
        onChangeSearch,
        onChangeType
    } = useArticleFilters()

    return (

        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('search')}
                    onChange={onChangeSearch}
                    value={search} />
            </Card>
            <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
        </div>
    )
}

export default memo(ArticlesPageFilters)

