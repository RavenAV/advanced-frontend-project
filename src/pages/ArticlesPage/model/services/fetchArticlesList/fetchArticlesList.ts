import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article, ArticleType } from "entities/Article"
import {
    getArticlesPageLimit, getArticlesPageNum, getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort,
    getArticlesPageType
} from "../../selectors/articlesPageSelectors"
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams"

interface FetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articleDetails/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        const limit = getArticlesPageLimit(getState())
        const sort = getArticlesPageSort(getState())
        const order = getArticlesPageOrder(getState())
        const search = getArticlesPageSearch(getState())
        const page = getArticlesPageNum(getState())
        const type = getArticlesPageType(getState())

        try {
            addQueryParams({
                sort: sort,
                order: order,
                search: search,
                type: type
            })
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user', //чтобы получить всю инфорацию о пользователе, создавшем коммент
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.ALL ? undefined : type,
                    q: search
                }
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data

        } catch (err) {
            return rejectWithValue("Getting article comments error.")
        }
    }
)