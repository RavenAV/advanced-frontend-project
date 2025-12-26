import { ArticleDetails } from "entities/Article"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleDetails />
        </div>
    )
}

export default memo(ArticleDetailsPage)