import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors"
import { articlesPageActions } from "../../slices/articlesPageSlice"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"
import { SortOrder } from "shared/types"
import { ArticleSortField, ArticleType } from "entities/Article"

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articleDetails/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            dispatch(articlesPageActions.setOrder(searchParams.get('order') as SortOrder ?? ''))
            dispatch(articlesPageActions.setSort(searchParams.get('sort') as ArticleSortField ?? ''))
            dispatch(articlesPageActions.setSearch(searchParams.get('search') ?? ''))
            dispatch(articlesPageActions.setType(searchParams.get('type') as ArticleType ?? ''))

            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({}))
        }
    }
)