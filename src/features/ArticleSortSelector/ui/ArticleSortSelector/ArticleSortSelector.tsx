import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder

    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { t } = useTranslation()
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props;

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('ascending')
        },
        {
            value: 'desc',
            content: t('descending')
        }
    ], [t])

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('by-created')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('by-title')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('by-views')
        }
    ], [t])

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                options={sortFieldOptions}
                label={t('sort-by')}
                value={sort}
                onChange={onChangeSort} />
            <Select<SortOrder>
                options={orderOptions}
                label={t('by')}
                value={order}
                onChange={onChangeOrder}
                className={cls.order} />
        </div>
    )
})
