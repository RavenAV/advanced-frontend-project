import { StateSchema } from "app/providers/StoreProvider"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import { getProfileError } from "./getProfileError"

describe('getProfileError', () => {
    test('should return error', () => {
        const data = {
            username: 'username',
            age: 25,
            country: Country.Russia,
            lastName: 'lastName',
            firstName: 'firstName',
            city: 'city',
            currency: Currency.RUB
        }
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error'
            }
        }
        expect(getProfileError(state as StateSchema)).toEqual('error')
    })

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})