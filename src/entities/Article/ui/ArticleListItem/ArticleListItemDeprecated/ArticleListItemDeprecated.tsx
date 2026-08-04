import { useTranslation } from 'react-i18next';
import cls from '../ArticleListItem.module.scss'
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticleBlockType, ArticleView } from '@/entities/Article/model/consts/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/widgets/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleTextBlock } from '@/entities/Article/model/types/article';
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { ArticleListItemProps } from '../ArticleListItem';
import { memo } from 'react';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
const { t } = useTranslation()
    const {
        className,
        article,
        view,
        target
    } = props

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    )

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks
            .find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
                data-testid='ArticleListItem'
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <AppImage
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                        fallback={<Skeleton width={'100%'} height={250} />}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t('read-more')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            to={getRouteArticleDetails(article.id)}
            target={target}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            data-testid='ArticleListItem'
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    )
})