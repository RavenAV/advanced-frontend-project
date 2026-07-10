import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { StarRating } from './StarRating';

const meta = {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
    },
    decorators: [
    ]
} satisfies Meta<typeof StarRating>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        selectedStars: 4,
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ],
}
