import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Theme } from  "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Text, TextSize, TextVariant } from './Text';

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
        variant: 'error'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TextErrorDark: Story = {
    args: {
        title: 'title',
        text: 'text',
        variant: 'error'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextSizeM: Story = {
    args: {
        title: 'title',
        text: 'text',
        size: 'm'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextSizeL: Story = {
    args: {
        title: 'title',
        text: 'text',
        size: 'l'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const TextSizeS: Story = {
    args: {
        title: 'title',
        text: 'text',
        size: 's'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}