import { Article, ArticleView } from 'entities/Article/model/types/article'
import cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'


interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation()
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target
    } = props

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                target={target}
                article={article}
                view={view}
                className={cls.card}
                key={article.id}
            />
        )
    }

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text title={t('articles-not-found')} size={TextSize.L} align={TextAlign.CENTER} />
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map((article) => (
                    renderArticle(article)
                ))
                : null
            }
            {isLoading && getSkeletons(view)}
        </div>
    )
})