import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';


const meta = {
    title: 'features/EditableProfileCard/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    argTypes: {
    },
    decorators: [
        RouteDecorator,
        StoreDecorator({})
    ]

} satisfies Meta<typeof EditableProfileCardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}