import axios from "axios";
import { loginByUsername } from "./loginByUsername";
import { StateSchema } from "app/providers/StoreProvider";
import { Dispatch } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/TestAsyncThunk";

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

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
        const result = await thunk.callThunk({ username: 'admin', password: '123' })
        
        //const action = loginByUsername({ username: 'admin', password: '123' })
        //const result = await action(dispatch, getState, undefined)
        
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(result.payload).toEqual(userValue)
    })

    test('auth error', async () => {
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk({ username: 'admin', password: '123' })
        
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.payload).toBe('Неверный логин или пароль.')
    })
})