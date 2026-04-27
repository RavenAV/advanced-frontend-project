import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { Theme } from '@/shared/const/theme';
import { ArticleType } from '@/entities/Article';


const meta = {
    title: 'features/ArticleTypeTabs',
    component: ArticleTypeTabs,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {
        value: ArticleType.ALL,
        onChangeType: () => { }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}