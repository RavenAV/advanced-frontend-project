import { ArticleDetails, ArticleList } from "entities/Article"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticleDetailsPage.module.scss'
import { Text, TextSize } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"
import { useSelector } from "react-redux"
import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { fetchCommentsArticleById } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { AddCommentForm } from "features/AddCommentForm"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { Button, ButtonTheme } from "widgets/Button/ui/Button"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { Page } from "widgets/Page/Page"
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationSlice"
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations"
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations"
import { articleDetailsPageReducer } from "../../model/slices"
import ArticleDetailsPageHeader from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"
import { VStack } from "shared/ui/Stack"

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details')
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const comments = useSelector(getArticleComments.selectAll)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)
    const dispatch = useAppDispatch()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch, id])

    useInitialEffect(() => {
        dispatch(fetchCommentsArticleById(id))
        dispatch(fetchArticleRecommendations())
    })

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>
                {t('article-not-found')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('recommended')} />
                    <ArticleList
                        className={cls.recommendations}
                        articles={recommendations}
                        target='_blank'
                        isLoading={recommendationsIsLoading} />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('comments')} />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList comments={comments} isLoading={commentsIsLoading} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)