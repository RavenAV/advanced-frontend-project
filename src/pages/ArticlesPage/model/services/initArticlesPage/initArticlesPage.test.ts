// проверить что в инициализированном стейте лишние ction не отрабатыват
// и наоборот

import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/TestAsyncThunk"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"
import { initArticlesPage } from "./initArticlesPage"

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('initArticlesPage.test', () => {
    test('dont call actions when inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: true
            }
        })

        await thunk.callThunk(new URLSearchParams({ param: 'value' }))

        expect(thunk.dispatch).toHaveBeenCalledTimes(2) // pending + fullfield()
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })

    test('call actions when not inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
                _inited: false
            }
        })

        await thunk.callThunk(new URLSearchParams({ param: 'value' }))

        expect(thunk.dispatch).toHaveBeenCalled() // pending + fullfilled + 2 dispatches inside
        expect(fetchArticlesList).toHaveBeenCalled()
    })
})