import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { UiDesignSwitcher } from './UiDesignSwitcher';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';


const meta = {
    title: 'features/UiDesignSwitcher',
    component: UiDesignSwitcher,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof UiDesignSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}