import { FeatureFlags } from '../../../types/featureFlags'
import { getFeatureFlags } from '../setGetFeatures'
import { ReactElement } from 'react'

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
    const { feature, on, off } = props
    
    if (getFeatureFlags(feature)) {
        return on
    }
    
    return off
}
