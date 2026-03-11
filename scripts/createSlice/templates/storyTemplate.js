module.exports = (layer, componentName) => `import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';
import { ${componentName} } from './${componentName}';


const meta = {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}`;
