import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Select } from './Select';
import { Theme } from  "@/shared/const/theme";

const meta = {
    title: 'shared/Select',
    component: Select,
    argTypes: {
    }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Choose value',
        options: [
            { value: '1', content: 'First' },
            { value: '2', content: 'Second' },
            { value: '3', content: 'Third' },
        ]
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}