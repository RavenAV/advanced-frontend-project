import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { AppLink, AppLinkVariant } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
    },
    args: {
        to: '/'
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Text',
        variant: 'primary'
    }
}

export const Red: Story = {
    args: {
        children: 'Text',
        variant: 'red'
    }
}