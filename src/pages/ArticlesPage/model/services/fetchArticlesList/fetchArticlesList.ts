import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors"

interface FetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articleDetails/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        const { page = 1 } = props
        const limit = getArticlesPageLimit(getState())

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user', //чтобы получить всю инфорацию о пользователе, создавшем коммент
                    _page: page,
                    _limit: limit
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