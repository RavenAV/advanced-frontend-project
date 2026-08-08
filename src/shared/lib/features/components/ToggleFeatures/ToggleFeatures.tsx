import { FeatureFlags } from '../../../../types/featureFlags'
import { getFeatureFlag } from '../../lib/setGetFeatures'
import { ReactElement } from 'react'

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
    const { feature, on, off } = props
    
    if (getFeatureFlag(feature)) {
        return on
    }
    
    return off
}
