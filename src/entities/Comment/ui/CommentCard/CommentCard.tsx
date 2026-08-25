import { memo } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import cls from './CommentCard.module.scss'
import { Comment } from "../../model/types/comment"
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar"
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text"
import { Text } from "@/shared/ui/redesigned/Text"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton"
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { getRouteProfile } from "@/shared/const/router"
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features"
import { Card } from "@/shared/ui/redesigned/Card"
import { AppLink } from "@/shared/ui/redesigned/AppLink"
import { Avatar } from "@/shared/ui/redesigned/Avatar"

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

const CommentCard = (props: CommentCardProps) => {
    const { className, isLoading, comment } = props

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    })

    if (isLoading) {
        return (
            <VStack gap="8" max className={classNames(cls.CommentCard, {}, [className, cls.loading])} data-testid="CommentCard.Loading">
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border={"50%"} />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width={'100%'} height={50} className={cls.text} />
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding="24" border="round" max>
                    <VStack gap='8' max className={classNames(cls.CommentCardRedesigned, {}, [className])} data-testid="CommentCard.Content">
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack gap='8'>
                                {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                                <Text text={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])} data-testid="CommentCard.Content">
                    <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cls.header}>
                        {comment.user.avatar ? <AvatarDeprecated size={30} src={comment.user.avatar} /> : null}
                        <TextDeprecated className={cls.username} text={comment.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </VStack>
            }
        />
    )
}

export default memo(CommentCard)