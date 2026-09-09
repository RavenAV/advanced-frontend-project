import { AppRouteByPathPattern, AppRoutes } from "@/shared/const/router";
import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

export function useRouteChange() {
    const location = useLocation()
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN)

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            // если текущая страница совпала с паттерном, то считаем, что эта страница открыта
            // и сохраняем в стейт
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route)
            }
        })
    }, [location.pathname])

    return appRoute
}