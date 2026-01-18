import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddCommentFormSchema } from "../types/addCommentForm"

const initialState: AddCommentFormSchema = {
    error: undefined,
    text: ''
}

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
    },

})

export const { reducer: addCommentFormReducer } = addCommentFormSlice
export const { actions: addCommentFormActions } = addCommentFormSlice