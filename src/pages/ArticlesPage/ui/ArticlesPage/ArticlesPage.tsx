import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleView, ArticleViewSelector } from "entities/Article"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slices/articlesPageSlice"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useSelector } from "react-redux"
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from "../../model/selectors/articlesPageSelectors"
import { Page } from "widgets/Page/Page"
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage"

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { t } = useTranslation()
    const { className } = props
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const error = useSelector(getArticlesPageError)
    const view = useSelector(getArticlesPageView)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    }, [dispatch])

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage())
    })

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList articles={articles} isLoading={isLoading} view={view} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)