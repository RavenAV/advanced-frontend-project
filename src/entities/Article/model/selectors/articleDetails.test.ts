import { StateSchema } from "@/app/providers/StoreProvider"
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetails"

describe('getArticleDetails', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'Javascript new'
        }
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: data
            }
        }
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
    })

    test('should return isLoading true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true
            }
        }
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
    })

    test('should return isLoading false', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false)
    })

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error'
            }
        }
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error')
    })

    test('should return error undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined)
    })
})