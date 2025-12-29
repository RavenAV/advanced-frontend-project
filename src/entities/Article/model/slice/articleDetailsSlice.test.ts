import { ArticleDetailsSchema } from "../types/articleDetailsSchema"
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById"
import { articleDetailsReducer } from "./articleDetailsSlice"
import { ArticleType } from "../types/article"

const data = {
    id: '1',
    title: 'Javascript new',
    subtitle: 'subtitle',
    img: 'https://www.clipartmax.com/png/middle/147-1474351_javascript-icon.png',
    views: 100,
    createdAt: '26.10.2025',
    type: [ ArticleType.IT ],
    blocks: []
}

describe('articleDetailsSlice test', () => {
    test('test fetch article by id pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false
        }
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.pending
        )).toEqual({
            isLoading: true,
            error: undefined
        })
    })

    test('test fetch article by id fullfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true
        }
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.fulfilled(data, '', data.id)
        )).toEqual({
            isLoading: false,
            error: undefined,
            data
        })
    })
})