import { Article } from '@/entities/Article/model/types/article'
import { ArticleView } from "@/entities/Article/model/consts/consts"
import cls from './ArticleList.module.scss'
import { HTMLAttributeAnchorTarget, memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text'
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized'
import { PAGE_ID } from '@/widgets/Page'


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
        virtualized = true
    } = props

    const isBig = view === ArticleView.BIG
    const itemsPerRow = isBig ? 1 : 3
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

    const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
        const items = []
        const fromIndex = index * itemsPerRow
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    target={target}
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    key={'str' + i}
                />
            )
        }
        return (
            <div
                className={cls.row}
                key={key}
                style={style}
            >
                {items}
            </div>
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
        <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
            {({ height, width, registerChild, scrollTop, onChildScroll, isScrolling }) => (
                <div
                    ref={registerChild}
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                >
                    {virtualized
                        ? (
                            <List
                                height={height ?? 700}
                                rowCount={rowCount}
                                rowHeight={isBig ? 700 : 330}
                                rowRenderer={rowRenderer}
                                width={width ? width - 80 : 700}
                                autoHeight
                                onScroll={onChildScroll}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
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
            )}
        </WindowScroller>
    )
})