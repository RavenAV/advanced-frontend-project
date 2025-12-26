import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"


interface ArticlesPageProps {
    className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { t } = useTranslation()
    const { className } = props

    return (
        <div className={classNames('', {}, [className])}>
            articles page
        </div>
    )
}

export default memo(ArticlesPage)