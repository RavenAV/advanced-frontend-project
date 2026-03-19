import { StoryFn } from "@storybook/react-webpack5";
import { Suspense } from "react";

export const SuspenseDecorator = (Story: StoryFn) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Story />
    </Suspense>
)