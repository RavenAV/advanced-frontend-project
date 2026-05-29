import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../types/user"
import { ThunkConfig } from "@/app/providers/StoreProvider"
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage"
import { getUserDataByIdQuery } from "../../api/userApi"

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi
        
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

        if (!userId) {
            return rejectWithValue("User id is undefined.")
        }

        try {
            // базовый url указан в midleware in store.ts
            const response = await dispatch(
                getUserDataByIdQuery(userId)
            )
            .unwrap()

            return response

        } catch (err) {
            console.log(err)
            return rejectWithValue("Save json settings error.")
        }
    }
)