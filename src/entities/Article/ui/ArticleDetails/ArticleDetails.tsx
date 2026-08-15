import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import cls from './ArticleDetails.module.scss'
import { memo, useCallback, useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById"
import { useSelector } from "react-redux"
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "../../model/selectors/articleDetails"
import { Text as DeprecatedText, TextAlign, TextSize } from "@/shared/ui/deprecated/Text"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { Avatar } from "@/shared/ui/deprecated/Avatar"
import EyeIcon from '@/shared/assets/icons/eye.svg'
import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import { Icon } from "@/shared/ui/deprecated/Icon"
import { ArticleBlock } from "../../model/types/article"
import { ArticleBlockType } from "@/entities/Article/model/consts/consts"
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent"
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent"
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { ToggleFeatures } from "@/shared/lib/features"
import { Text } from "@/shared/ui/redesigned/Text"
import { AppImage } from "@/shared/ui/redesigned/AppImage"
import { Skeleton } from "@/shared/ui/redesigned/Skeleton"

interface ArticleDetailsProps {
    className?: string
    id?: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

const renderArticleBlock = (block: ArticleBlock) => {
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
}

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData)

    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <Avatar size={200} src={article?.img} className={cls.avatar} />
            </HStack>

            <VStack gap='4' max data-testid="ArticleDetails.Info">
                <DeprecatedText title={article?.title} text={article?.subtitle} className={cls.title} size={TextSize.L} />
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <DeprecatedText text={String(article?.views)} />
                </HStack>
                <HStack gap='8' className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon} />
                    <DeprecatedText text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    )
}

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData)

    return (
        <>
            <Text
                title={article?.title}
                size={"l"}
                bold
            />
            <Text
                title={article?.subtitle}
            />
            <AppImage
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                src={article?.img}
                className={cls.img}
            />

            
            {article?.blocks.map(renderArticleBlock)}
        </>
    )
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { t } = useTranslation('article-details')
    const { className, id } = props
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id))
        }
    }, [dispatch, id])

    let content;

    if (isLoading) {
        content = (
            <>
                <SkeletonDeprecated width={200} height={200} border={"50%"} className={cls.avatar} />
                <SkeletonDeprecated width={300} height={24} className={cls.title} />
                <SkeletonDeprecated width={600} height={24} className={cls.skeleton} />
                <SkeletonDeprecated width={'100%'} height={200} className={cls.skeleton} />
                <SkeletonDeprecated width={'100%'} height={200} className={cls.skeleton} />
            </>
        )
    } else if (error) {
        content = (
            <Text align={TextAlign.CENTER} title={t('article-loading-error')} />
        )
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack max gap='16' className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})