import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';

const meta = {
    title: 'shared/Code',
    component: Code,
    argTypes: {
    }
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLight: Story = {
    args: {
        text: `<div style="color: red">Text</div>`
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}
