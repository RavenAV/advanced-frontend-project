import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './ArticlesPage.module.scss'
import { ArticleList } from "entities/Article"

interface ArticlesPageProps {
    className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList articles={[]} />
        </div>
    )
}

export default memo(ArticlesPage)