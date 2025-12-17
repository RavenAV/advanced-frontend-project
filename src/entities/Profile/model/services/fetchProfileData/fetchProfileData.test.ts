import axios from "axios";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/TestAsyncThunk";
import { fetchProfileData } from "./fetchProfileData";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";

const data = {
    username: 'username',
    age: 25,
    country: Country.Russia,
    lastName: 'lastName',
    firstName: 'firstName',
    city: 'city',
    currency: Currency.RUB
}

describe('fetchProfileData test', () => {
    test('success', async () => {

        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ data: data }))
        const result = await thunk.callThunk()

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
    })
})