import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment"

export const fetchCommentsArticleById = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetcCommentshArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        if (!articleId) {
            return rejectWithValue("Getting article comments error - article id error.")
        }

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId, // ищем комментарии по id статьи
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