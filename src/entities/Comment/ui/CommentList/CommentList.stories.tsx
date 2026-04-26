


import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from  "@/shared/const/theme";
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentList } from './CommentList';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';

const meta = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        comments: [
            { id: '1', text: 'text 1', user: { id: '1', username: 'username 1' } },
            { id: '2', text: 'text 2', user: { id: '1', username: 'username 1' } },
            { id: '3', text: 'text 3', user: { id: '2', username: 'username 2' } }
        ]
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ]
}

export const Loading: Story = {
    args: {
        comments: [],
        isLoading: true
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ]
}