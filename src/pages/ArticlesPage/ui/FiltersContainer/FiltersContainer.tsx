import { ArticlesFilters } from "@/widgets/ArticlesFilters";
import { memo } from "react";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props
    const { 
        search,
        sort,
        order,
        type,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType
    } = useArticleFilters()

    return (
        <ArticlesFilters
            search={search}
            sort={sort}
            order={order}
            type={type}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
            className={className}
        />
    )
})