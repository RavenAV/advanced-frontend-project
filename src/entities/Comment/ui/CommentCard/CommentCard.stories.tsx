import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from  "@/shared/const/theme";
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import CommentCard from './CommentCard';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalArgs = {
    comment: {
        id: '1',
        text: 'text 1',
        user: { id: '1', username: 'username 1' }
    }
}

export const Normal: Story = {
    args: normalArgs,
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ]
}

export const NormalRedesigned: Story = {
    args: normalArgs,
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        NewDesignDecorator
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