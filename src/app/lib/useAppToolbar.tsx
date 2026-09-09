import { AppRoutes } from "@/shared/const/router";
import { useRouteChange } from "@/shared/lib/router/useRouteChange";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";
import { ReactElement } from "react";

// в зависимости от страницы выбирает тулбар
export function useAppToolbar() {
    const currentRoute = useRouteChange()

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    }

    return toolbarByAppRoute[currentRoute]
}