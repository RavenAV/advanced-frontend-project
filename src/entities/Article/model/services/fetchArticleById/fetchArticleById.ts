import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        if (!articleId) {
            return rejectWithValue("Article id is undefined.")
        }

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user'
                }
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data

        } catch (err) {
            console.log(err)
            return rejectWithValue("Getting article error.")
        }
    }
)

