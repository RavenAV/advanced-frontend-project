import { StateSchema } from "app/providers/StoreProvider"
import { getProfileData } from "./getProfileData"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"



describe('getProfileData', () => {
    test('should return data', () => {
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
                data: data
            }
        }
        expect(getProfileData(state as StateSchema)).toEqual(data)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})