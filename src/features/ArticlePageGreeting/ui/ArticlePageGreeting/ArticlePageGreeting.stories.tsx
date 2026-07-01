import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ArticlePageGreeting } from './ArticlePageGreeting';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';


const meta = {
    title: 'features/ArticlePageGreeting',
    component: ArticlePageGreeting,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticlePageGreeting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}