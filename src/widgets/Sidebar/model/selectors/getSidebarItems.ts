import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/sidebar";
import AboutIconDeprecated from '@/shared/assets/icons/about.svg'
import MainIconDeprecated from '@/shared/assets/icons/main.svg'
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg'
import ArticleIconDeprecated from '@/shared/assets/icons/articles.svg'
import AboutIcon from '@/shared/assets/icons/Info.svg'
import MainIcon from '@/shared/assets/icons/home.svg'
import ProfileIcon from '@/shared/assets/icons/avatar.svg'
import ArticleIcon from '@/shared/assets/icons/article.svg'
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";
import { toggleFeatures } from "@/shared/lib/features";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'main',
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => MainIcon,
                    off: () => MainIconDeprecated
                })
                
            },
            {
                path: getRouteAbout(),
                text: 'about',
                Icon: toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => AboutIcon,
                    off: () => AboutIconDeprecated
                })
            }
        ]

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'profile',
                    Icon: toggleFeatures({
                        name: "isAppRedesigned",
                        on: () => ProfileIcon,
                        off: () => ProfileIconDeprecated
                    }),
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: 'articles',
                    Icon: toggleFeatures({
                        name: "isAppRedesigned",
                        on: () => ArticleIcon,
                        off: () => ArticleIconDeprecated
                    })
                }
            )
        }

        return sidebarItemsList
    }
)
