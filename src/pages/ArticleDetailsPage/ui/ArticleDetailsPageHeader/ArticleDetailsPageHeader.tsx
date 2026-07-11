import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "@/widgets/Button"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCanEditArticle } from "../../model/selectors/article"
import { getArticleDetailsData } from "@/entities/Article"
import { HStack } from "@/shared/ui/deprecated/Stack"
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router"

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
        navigate(getRouteArticles())
    }, [navigate])

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article?.id))
        }
    }, [navigate, article])

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}>
                {t('back-to-list')}
            </Button>
            {canEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}>
                    {t('edit')}
                </Button>
            )}
        </HStack>
    )
}

export default memo(ArticleDetailsPageHeader)

