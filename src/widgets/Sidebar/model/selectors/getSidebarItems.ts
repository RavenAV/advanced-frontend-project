import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/sidebar";
import AboutIcon from '@/shared/assets/icons/about.svg'
import MainIcon from '@/shared/assets/icons/main.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import ArticleIcon from '@/shared/assets/icons/articles.svg'
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'main',
                Icon: MainIcon
            },
            {
                path: getRouteAbout(),
                text: 'about',
                Icon: AboutIcon
            }
        ]

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'profile',
                    Icon: ProfileIcon,
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: 'articles',
                    Icon: ArticleIcon
                }
            )
        }

        return sidebarItemsList
    }
)