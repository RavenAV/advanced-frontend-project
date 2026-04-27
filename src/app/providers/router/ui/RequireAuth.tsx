import { getUserAuthData, getUserRoles, UserRole } from "@/entities/User";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { getRouteForbidden, getRouteMain } from "@/shared/const/router";

interface RequireAuthProps {
    roles?: UserRole[]
    children: JSX.Element
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()
    const userRoles = useSelector(getUserRoles)

    const hasRequairedRoles = useMemo(() => {
        if (!roles) {
            return true
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole)
            return hasRole
        })
    }, [roles, userRoles])

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />
    }

    if (!hasRequairedRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    }

    return children
}