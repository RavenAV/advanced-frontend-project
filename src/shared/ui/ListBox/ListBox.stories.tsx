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

export const Primary: Story = {
    args: {
        items: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ],
        defaultValue: 'Выберите значение',
        onChange: () => {},
        value: undefined
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}