import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import cls from './ArticleDetails.module.scss'
import { memo, useCallback, useEffect } from "react"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById"
import { useSelector } from "react-redux"
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "../../model/selectors/articleDetails"
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { Avatar } from "shared/ui/Avatar/Avatar"
import EyeIcon from 'shared/assets/icons/eye.svg'
import CalendarIcon from 'shared/assets/icons/calendar.svg'
import { Icon } from "shared/ui/Icon/Icon"
import { ArticleBlock, ArticleBlockType } from "../../model/types/article"
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent"
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent"
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent"

interface ArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { t } = useTranslation('article-details')
    const { className, id } = props
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />
            default:
                return null
        }
    }, [])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id))
        }
    }, [dispatch, id])

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton width={200} height={200} border={"50%"} className={cls.avatar} />
                <Skeleton width={300} height={24} className={cls.title} />
                <Skeleton width={600} height={24} className={cls.skeleton} />
                <Skeleton width={'100%'} height={200} className={cls.skeleton} />
                <Skeleton width={'100%'} height={200} className={cls.skeleton} />
            </>
        )
    } else if (error) {
        content = (
            <Text align={TextAlign.CENTER} title={t('article-loading-error')} />
        )
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={cls.avatar} />
                </div>

                <Text title={article?.title} text={article?.subtitle} className={cls.title} size={TextSize.L} />

                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    )
})