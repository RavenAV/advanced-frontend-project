import { Country } from "entities/Country"
import { ProfileSchema, ValidateProfileError } from "../types/profile"
import { profileActions, profileReducer } from "./profileSlice"
import { Currency } from "entities/Currency"
import { updateProfileData } from "../services/updateProfileData/updateProfileData"

const data = {
    username: 'username',
    age: 25,
    country: Country.Russia,
    lastName: 'lastName',
    firstName: 'firstName',
    city: 'city',
    currency: Currency.RUB
}

describe('profileSlice test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadOnly(true)
        )).toEqual({ readonly: true })
    })

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data
        })
    })

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123456' } }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '123'
            })
        )).toEqual({
            form: {
                username: '123'
            }
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        }
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: undefined
        })
    })

    test('test update profile service fullfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR]
        }
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data
        })
    })
})