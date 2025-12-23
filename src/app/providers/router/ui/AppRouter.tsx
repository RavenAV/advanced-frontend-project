import { getUserAuthData } from 'entities/User';
import React, { memo, Suspense, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { AppRouteProps, AppRouters, routeConfig } from "shared/config/routerConfig/routerConfig";
import { PageLoader } from "widgets/PageLoader";
import { RequireAuth } from './RequireAuth';

//rsc
const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                    {route.element}
                </div>
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly
                    ? <RequireAuth>{element}</RequireAuth>
                    : element
                }
            />
        )
    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);