import { StateSchema } from "app/providers/StoreProvider"
import { getProfileValidateErrors } from "./getProfileValidateErrors"
import { ValidateProfileError } from "../../types/editableProfileCardSchema"

describe('getProfileValidateErrors', () => {
    test('should return validete errors', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [
                    ValidateProfileError.SERVER_ERROR,
                    ValidateProfileError.INCORRECT_AGE
                ]
            }
        }
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORRECT_AGE
        ])
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
    })
})