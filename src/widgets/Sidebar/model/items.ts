import { SVGProps, VFC } from "react"
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/main.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticleIcon from 'shared/assets/icons/articles.svg'
import { RoutePath } from "shared/config/routerConfig/routerConfig"

export interface SidebarItemType {
    path: string
    text: string
    Icon: VFC<SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'main',
        Icon: MainIcon
    },
    {
        path: RoutePath.about,
        text: 'about',
        Icon: AboutIcon
    },
    {
        path: RoutePath.profile,
        text: 'profile',
        Icon: ProfileIcon,
        authOnly: true
    },
    {
        path: RoutePath.articles,
        text: 'articles',
        Icon: ArticleIcon,
        authOnly: true
    },
]