import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { RatingCard } from './RatingCard';
import { NewDesignDecorator } from "@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator";

const meta = {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    argTypes: {
    },
    decorators: [
    ]
} satisfies Meta<typeof RatingCard>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        rate: 4,
        feedbackTitle: 'Good!',
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ],
}

export const Redesigned: Story = {
    args: {
        rate: 4,
        feedbackTitle: 'Good!',
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({}),
        NewDesignDecorator
    ],
}
