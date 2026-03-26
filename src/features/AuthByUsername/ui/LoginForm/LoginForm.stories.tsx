import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import LoginForm from './LoginForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
    }
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormPrimary: Story = {
    args: {
        onSuccess: () => { }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            loginForm: {
                username: '123',
                password: '123'
            }
        })
    ]
}

export const LoginFormWithError: Story = {
    args: {
        onSuccess: () => { }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            loginForm: {
                username: '123',
                password: '123',
                error: 'error'
            }
        })
    ]
}

export const LoginFormLoading: Story = {
    args: {
        onSuccess: () => { }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            loginForm: {
                isLoading: true
            }
        })
    ]
}
