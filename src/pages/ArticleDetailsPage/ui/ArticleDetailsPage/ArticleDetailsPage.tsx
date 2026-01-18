import { ArticleDetails } from "entities/Article"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticleDetailsPage.module.scss'
import { Text } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { articleDetailsCommentsReducer, getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"
import { useSelector } from "react-redux"
import { getArticleCommentsIsLoading } from "pages/ArticleDetailsPage/model/selectors/comments"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect"
import { fetchCommentsArticleById } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { AddCommentForm } from "features/AddCommentForm"
import { addCommentForArticle } from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle"

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details')
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch, id])

    useInitialEffect(() => {
        dispatch(fetchCommentsArticleById(id))
    })

    if (!id) {
        return (
            <div className={classNames('', {}, [className])}>
                {t('article-not-found')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('comments')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList comments={comments} isLoading={commentsIsLoading} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)