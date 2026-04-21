import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './ArticleEditPage.module.scss'
import { useParams } from "react-router-dom"
import { Page } from "@/widgets/Page"

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

