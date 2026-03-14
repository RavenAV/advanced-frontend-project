import { StateSchema } from "app/providers/StoreProvider"
import { getProfileReadOnly } from "./getProfileReadOnly"

describe('getProfileReadOnly', () => {
    test('should return readonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true
            }
        }
        expect(getProfileReadOnly(state as StateSchema)).toEqual(true)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined)
    })
})