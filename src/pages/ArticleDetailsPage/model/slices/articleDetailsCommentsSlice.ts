import {
    createEntityAdapter,
    createSlice,
    EntityState,
    PayloadAction
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Comment } from 'entities/Comment'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import { fetchCommentsArticleById } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsArticleById.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchCommentsArticleById.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.isLoading = false
                commentsAdapter.setAll(state, action.payload) // сам добавит id, нормализует данные
            })
            .addCase(fetchCommentsArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

    }
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
