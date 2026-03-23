import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { Popover } from "./Popover";
import { Button } from "widgets/Button/ui/Button";

const meta = {
    title: 'shared/Popups/Popover',
    component: Popover,
    argTypes: {
    }
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopLeft: Story = {
    args: {
        children: <Button>open</Button>,
        trigger: <Button>open</Button>,
        direction: 'top left'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TopRight: Story = {
    args: {
        children: <Button>open</Button>,
        trigger: <Button>open</Button>,
        direction: 'top right'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BottomLeft: Story = {
    args: {
        children: <Button>open</Button>,
        trigger: <Button>open</Button>,
        direction: 'bottom left'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BottomRight: Story = {
    args: {
        children: <Button>open</Button>,
        trigger: <Button>open</Button>,
        direction: 'bottom right'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}