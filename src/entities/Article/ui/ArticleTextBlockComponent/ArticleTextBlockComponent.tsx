import { ArticleTextBlock } from "../../model/types/article"
import cls from './ArticleTextBlockComponent.module.scss'
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "@/shared/lib/classNames/classNames"
import { Text } from "@/shared/ui/deprecated/Text"


interface ArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation()
    const { className, block } = props

    return (
        <div className={classNames('', {}, [className])}>
            {block.title && (
                <Text title={block.title} className={cls.title} />
            )}

            {block.paragraphs.map((paragraph) => (
                <Text text={paragraph} key={paragraph} className={cls.paragraph}/>
            ))}
        </div>
    )
})