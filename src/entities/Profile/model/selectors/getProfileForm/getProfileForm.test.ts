import { StateSchema } from "app/providers/StoreProvider"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import { getProfileForm } from "./getProfileForm"

describe('getProfileForm', () => {
    test('should return form', () => {
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
                form: data
            }
        }
        expect(getProfileForm(state as StateSchema)).toEqual(data)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileForm(state as StateSchema)).toEqual(undefined)
    })
})