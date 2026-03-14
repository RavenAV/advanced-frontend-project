import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';
import { EditableProfileCard } from './EditableProfileCard';


const meta = {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {
        id: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}