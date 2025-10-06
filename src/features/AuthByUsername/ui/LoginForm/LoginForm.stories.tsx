import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginForm } from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
    }
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLight: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

