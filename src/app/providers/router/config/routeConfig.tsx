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
import { RoutePath } from "@/shared/const/router";
import { AppRouters } from "@/shared/const/router";

export const routeConfig: Record<AppRouters, AppRouteProps> = {
    [AppRouters.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRouters.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    },
    [AppRouters.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true
    },
    [AppRouters.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: <ArticleEditPage />,
        authOnly: true
    },
    [AppRouters.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: <ArticleEditPage />,
        authOnly: true
    },
    [AppRouters.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    },
    [AppRouters.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER]
    },
    [AppRouters.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />
    }
}