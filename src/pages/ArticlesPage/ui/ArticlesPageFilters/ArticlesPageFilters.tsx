import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './ArticlesPageFilters.module.scss'
import { useSelector } from "react-redux"
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from "../../model/selectors/articlesPageSelectors"
import { ArticleSortField, ArticleView } from "@/entities/Article"
import { articlesPageActions } from "../../model/slices/articlesPageSlice"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Input } from "@/shared/ui/Input"
import { Card } from "@/shared/ui/Card"
import { SortOrder } from "@/shared/types/sort"
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList"
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce"
import { TabItem, Tabs } from "@/shared/ui/Tabs"
import { ArticleType } from "@/entities/Article/model/consts/consts"
import { ArticleSortSelector } from "@/features/ArticleSortSelector"
import { ArticleViewSelector } from "@/features/ArticleViewSelector"
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs"


interface ArticlesPageFiltersProps {
    className?: string
}


const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { t } = useTranslation()
    const { className } = props
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)
    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    }, [dispatch])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch])

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
    }, [dispatch, debouncedFetchData])

    const onChangeTab = useCallback((value: ArticleType) => {
        dispatch(articlesPageActions.setType(value))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch])

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
            <ArticleTypeTabs value={type} onChangeType={onChangeTab} className={cls.tabs} />
        </div>
    )
}

export default memo(ArticlesPageFilters)

