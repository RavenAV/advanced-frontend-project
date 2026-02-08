import { RouteProps } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticleEditPage } from "pages/ArticleEditPage";


export type AppRouteProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRouters {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRouters, string> = {
    [AppRouters.MAIN]: '/',
    [AppRouters.ABOUT]: '/about',
    [AppRouters.PROFILE]: '/profile/',
    [AppRouters.ARTICLES]: '/articles',
    [AppRouters.ARTICLE_DETAILS]: '/articles/', // :id
    [AppRouters.ARTICLE_CREATE]: '/articles/new',
    [AppRouters.ARTICLE_EDIT]: '/articles/:id/edit',

    // last
    [AppRouters.NOT_FOUND]: '*'
}

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
}