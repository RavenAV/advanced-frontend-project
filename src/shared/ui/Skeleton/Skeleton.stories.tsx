import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { Skeleton } from "./Skeleton";

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
    }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightNormal: Story = {
    args: {
        width: '100%',
        height: 150
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const LightCircle: Story = {
    args: {
        border: '50%',
        width: '150px',
        height: '150px'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const DarkNormal: Story = {
    args: {
        width: '100%',
        height: 150
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const DarkCircle: Story = {
    args: {
        border: '50%',
        width: '150px',
        height: '150px'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}