import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from './CommentList.module.scss'
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/Text/Text"
import CommentCard from "../CommentCard/CommentCard"
import { Comment } from "../../model/types/comment"

interface CommentListProps {
    className?: string
    comments?: Comment[]
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        )
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map(comment =>
                    <CommentCard
                        className={cls.comment}
                        comment={comment}
                        isLoading={isLoading}
                        key={comment.id}
                    />)
                : <Text text={t('no-comments')} />
            }
        </div>
    )
})