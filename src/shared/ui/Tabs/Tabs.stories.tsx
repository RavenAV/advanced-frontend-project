import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Tabs } from './Tabs';
import { action } from "@storybook/addon-actions";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
    }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        tabs: [
            { value: 'tab 1', content: 'Tab 1' },
            { value: 'tab 2', content: 'Tab 2' },
            { value: 'tab 3', content: 'Tab 3' }
        ],
        value: 'tab 2',
        onTabClick: () => { }
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}