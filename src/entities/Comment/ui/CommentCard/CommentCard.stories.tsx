


import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import CommentCard from './CommentCard';

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
    }
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        comment: {
            id: '1',
            text: 'text 1',
            user: { id: '1', username: 'username 1' }
        }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ]
}

export const Loading: Story = {
    args: {
        comment: {
            id: '1',
            text: 'text 1',
            user: { id: '1', username: 'username 1' }
        },
        isLoading: true
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ]
}