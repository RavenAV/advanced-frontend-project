import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        const formData = getProfileForm(getState())

        try {
            // базовый url указан в midleware in store.ts
            const response = await extra.api.put<Profile>('/profile', formData)
            return response.data
        
        } catch (err) {
            console.log(err)
            return rejectWithValue("Getting profile error.")
        }
    }
)

