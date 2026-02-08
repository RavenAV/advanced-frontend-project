import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticleEditPage.module.scss'
import { useNavigate, useParams } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { useSelector } from "react-redux"
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article"
import { Page } from "widgets/Page/Page"

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { t } = useTranslation()
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const isEdit = Boolean(id)
    //const canEditArticle = useSelector(getCanEditArticle)

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit
                ? t('editing-article')
                : t('Create an article')
            }
        </Page>
    )
})

export default ArticleEditPage

