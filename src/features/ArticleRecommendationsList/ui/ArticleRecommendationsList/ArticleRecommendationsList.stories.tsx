import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}