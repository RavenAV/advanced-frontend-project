import { TestAsyncThunk } from "@/shared/lib/tests/testAsyncThunk/TestAsyncThunk"
import { fetchNextArticlesPage } from "./fetchNextArticlesPage"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toHaveBeenCalledTimes(4) // pending + fullfilled + 2 dispatches inside
        expect(fetchArticlesList).toBeCalled()
    })

    test('fetch articlelist not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toHaveBeenCalledTimes(2) // pending + fullfilled
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })

    test('fetch articlelist not called and is loading true', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: false
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toHaveBeenCalledTimes(2) // pending + fullfield
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})