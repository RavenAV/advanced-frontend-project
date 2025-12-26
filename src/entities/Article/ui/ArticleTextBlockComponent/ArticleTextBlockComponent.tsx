import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"


interface ArticleTextBlockComponentProps {
    className?: string
}

export const ArticleTextBlockComponent = (props: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames('', {}, [className])}>
            ArticleTextBlockComponent
        </div>
    )
}