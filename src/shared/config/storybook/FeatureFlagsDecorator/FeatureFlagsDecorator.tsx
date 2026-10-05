import { setFeatureFlags } from "@/shared/lib/features";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { StoryFn } from "@storybook/react-webpack5";

export const FeatureFlagsDecorator = (features: FeatureFlags) => (Story: StoryFn) => {
    setFeatureFlags(features)
    return (
        <Story />
    )
}