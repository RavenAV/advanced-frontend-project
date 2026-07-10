import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { AppImage } from './AppImage';

const meta = {
    title: 'shared/AppImage',
    component: AppImage,
    argTypes: {
    },
    args: {

    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    }
}