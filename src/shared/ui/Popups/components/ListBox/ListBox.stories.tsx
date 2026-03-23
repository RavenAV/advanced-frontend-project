import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ListBox } from "./ListBox";

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
    }
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopLeft: Story = {
    args: {
        items: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ],
        defaultValue: 'Выберите значение',
        onChange: () => {},
        value: undefined,
        direction: 'top left'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const TopRight: Story = {
    args: {
        items: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ],
        defaultValue: 'Выберите значение',
        onChange: () => {},
        value: undefined,
        direction: 'top right'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BottomLeft: Story = {
    args: {
        items: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ],
        defaultValue: 'Выберите значение',
        onChange: () => {},
        value: undefined,
        direction: 'bottom left'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BottomRight: Story = {
    args: {
        items: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ],
        defaultValue: 'Выберите значение',
        onChange: () => {},
        value: undefined,
        direction: 'bottom right'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}