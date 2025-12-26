import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"


interface ArticleImageBlockComponentProps {
    className?: string
}

export const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames('', {}, [className])}>
            ArticleImageBlockComponent
        </div>
    )
}