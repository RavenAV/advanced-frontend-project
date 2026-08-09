import { FeatureFlags } from "@/shared/types/featureFlags";

//  Фичи не меняются в течении сессии
let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag] ?? true // заглушка
}

export function getAllFeatureFlags() {
    return featureFlags
}