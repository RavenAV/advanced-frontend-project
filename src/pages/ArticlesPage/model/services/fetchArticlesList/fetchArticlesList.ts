import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import { Comment } from "entities/Comment"

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetails/fetchArticlesList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user' //чтобы получить всю инфорацию о пользователе, создавшем коммент
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