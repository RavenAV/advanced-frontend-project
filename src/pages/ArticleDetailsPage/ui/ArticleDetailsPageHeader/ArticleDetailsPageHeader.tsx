import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticleDetailsPageHeader.module.scss'
import { Button, ButtonTheme } from "widgets/Button/ui/Button"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { useSelector } from "react-redux"
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article"
import { getArticleDetailsData } from "entities/Article"

interface ArticleDetailsPageHeaderProps {
    className?: string
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation()
    const { className } = props
    const navigate = useNavigate()
    const canEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [navigate, article?.id])

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}>
                {t('back-to-list')}
            </Button>
            {canEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.editBtn}
                    onClick={onEditArticle}>
                    {t('edit')}
                </Button>
            )}
        </div>
    )
}

export default memo(ArticleDetailsPageHeader)

