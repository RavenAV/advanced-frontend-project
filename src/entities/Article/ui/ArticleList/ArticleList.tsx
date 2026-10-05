import { Article } from '@/entities/Article/model/types/article'
import { ArticleView } from "@/entities/Article/model/consts/consts"
import cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text'
import { PAGE_ID } from '@/widgets/Page'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Virtuoso } from 'react-virtuoso';

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
    // для условной виртуализации
    virtualized?: boolean
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
        target,
        virtualized = false
    } = props

    const isBig = view === ArticleView.BIG
    const itemsPerRow = isBig ? 1 : 3
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

    const renderRow = useCallback((index: number) => {
        const fromIndex = index * itemsPerRow
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)
        const items = []

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    target={target}
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    key={articles[i].id}
                />
            )
        }

        return (
            <div className={cls.row}>
                {items}
            </div>
        )
    }, [articles, itemsPerRow, target, view])

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text title={t('articles-not-found')} size={TextSize.L} align={TextAlign.CENTER} />
            </div>
        )
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack
                    gap="16"
                    wrap="wrap"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    data-testid='ArticleList'
                >      
                    {articles.map((article) => (
                        <ArticleListItem
                            target={target}
                            article={article}
                            view={view}
                            className={cls.card}
                            key={article.id}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                <div
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                    data-testid='ArticleList'
                >
                    {virtualized
                        ? (
                            <Virtuoso
                                customScrollParent={document.getElementById(PAGE_ID) as HTMLElement}
                                totalCount={rowCount}
                                itemContent={renderRow}
                                increaseViewportBy={200}
                                style={{ width: '100%' }}
                            />
                        )
                        : (
                            articles.map((article) => (
                                <ArticleListItem
                                    target={target}
                                    article={article}
                                    view={view}
                                    className={cls.card}
                                    key={article.id}
                                />
                            ))
                        )
                    }

                    {isLoading && getSkeletons(view)}
                </div>
            }
        />
    )
})