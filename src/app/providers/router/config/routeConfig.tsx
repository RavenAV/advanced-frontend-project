import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AppRouteProps } from "@/shared/types/router";
import {
    getRouteAbout, getRouteAdminPanel, getRouteArticleCreate, getRouteArticleDetails, getRouteArticleEdit, getRouteArticles,
    getRouteForbidden, getRouteMain, getRouteNotFound, getRouteProfile,
    getRouteSettings
} from "@/shared/const/router";
import { AppRouters } from "@/shared/const/router";
import { SettingsPage } from "@/pages/SettingsPage";

export const routeConfig: Record<AppRouters, AppRouteProps> = {
    [AppRouters.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />
    },
    [AppRouters.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />
    },
    [AppRouters.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true
    },
    [AppRouters.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true
    },
    [AppRouters.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />
    },
    [AppRouters.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER]
    },
    [AppRouters.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
        authOnly: true
    },
    [AppRouters.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />
    }
}