import axios from "axios";
import { loginByUsername } from "./loginByUsername";
import { StateSchema } from "app/providers/StoreProvider";
import { Dispatch } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/TestAsyncThunk";

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

describe('loginByUsername test', () => {
    // это заккоментили после добавление класса TestAsyncThunk
    /*let dispatch: Dispatch
    let getState: () => StateSchema

    beforeEach(() => {
        dispatch = jest.fn()
        getState = jest.fn()
    })*/

    test('auth success', async () => {
        const userValue =  { username: 'admin', id: '1' }
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: 'admin', password: '123' })
        
        //const action = loginByUsername({ username: 'admin', password: '123' })
        //const result = await action(dispatch, getState, undefined)
        
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(result.payload).toEqual(userValue)
    })

    test('auth error', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
        
        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: 'admin', password: '123' })
        
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.payload).toBe('Неверный логин или пароль.')
    })
})