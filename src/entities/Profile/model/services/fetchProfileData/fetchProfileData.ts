import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.get<Profile>('/profile')

            if (!response.data) {
                throw new Error()
            }

            return response.data

        } catch (err) {
            console.log(err)
            return rejectWithValue("Getting profile error.")
        }
    }
)

