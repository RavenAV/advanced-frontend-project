import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"


interface ArticleDetailsProps {
    className?: string
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames('', {}, [className])}>
            ArticleDetails
        </div>
    )
}