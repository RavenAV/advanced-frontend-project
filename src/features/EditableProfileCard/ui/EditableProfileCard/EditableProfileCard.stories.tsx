import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from  "@/shared/const/theme";
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { EditableProfileCard } from './EditableProfileCard';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';


const meta = {
    title: 'features/EditableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
    },
    decorators: [
        RouteDecorator,
        StoreDecorator({})
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