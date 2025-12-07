import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Avatar } from './Avatar';
import AvatarImg from './stitch.jpg'

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        size: 150,
        src: AvatarImg
    }
}

export const Small: Story = {
    args: {
        size: 50,
        src: AvatarImg
    }
}