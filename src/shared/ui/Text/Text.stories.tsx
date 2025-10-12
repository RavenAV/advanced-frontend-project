import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Text, TextTheme } from './Text';

const meta = {
    title: 'shared/Text',
    component: Text,
    argTypes: {
    }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextPrimeryLight: Story = {
    args: {
        title: 'title',
        text: 'text'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TextOnlyTitleLight: Story = {
    args: {
        title: 'title'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TextPrimeryOnlyTextLight: Story = {
    args: {
        text: 'text'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TextPrimeryDark: Story = {
    args: {
        title: 'title',
        text: 'text'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextOnlyTitleDark: Story = {
    args: {
        title: 'title'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextPrimeryOnlyTextDark: Story = {
    args: {
        text: 'text'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextErrorLight: Story = {
    args: {
        title: 'title',
        text: 'text',
        theme: TextTheme.ERROR
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TextErrorDark: Story = {
    args: {
        title: 'title',
        text: 'text',
        theme: TextTheme.ERROR
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}