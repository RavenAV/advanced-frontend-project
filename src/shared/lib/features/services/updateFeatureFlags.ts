import { ThunkConfig } from "@/app/providers/StoreProvider"
import { FeatureFlags } from "@/shared/types/featureFlags"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateFeatureFlagsMutation } from "../api/featureFlagsApi"
import { getAllFeatureFlags, setFeatureFlags } from "../lib/setGetFeatures"

interface UpdaedFeatureFlagOptions {
    userId: string
    newFeatures: Partial<FeatureFlags>
}

export const updateFeatureFlags = createAsyncThunk<
    void,
    UpdaedFeatureFlagOptions,
    ThunkConfig<string>
>("features/updateFeatureFlags", async ({ userId, newFeatures }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    
    const allFeatures = {
        ...getAllFeatureFlags(),
        ...newFeatures
    }
    
    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: allFeatures
            })
        )

        setFeatureFlags(allFeatures)

        // т.к. нет сторов и т.п. обновление флагов не вызовет рендер страницы и изменения не отобразятся, поэтому здесь и вызываем перезагрузку страницы
        window.location.reload()
        return undefined
    } catch (e) {
        console.log(e)
        return rejectWithValue("error")
    }
})