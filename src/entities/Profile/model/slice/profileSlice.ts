import { createSlice } from "@reduxjs/toolkit"
import { ProfileSchema } from "entities/Profile"

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    }
})

export const { reducer: profileReducer } = profileSlice
export const { actions: profileActions } = profileSlice