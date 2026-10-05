import { getAllFeatureFlags, setFeatureFlags } from "@/shared/lib/features/lib/setGetFeatures"
import { StoryFn } from "@storybook/react-webpack5"

export const NewDesignDecorator = (Story: StoryFn) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true })
    return (
        <div className="app_redesigned">
            <Story />
        </div>
    )
}