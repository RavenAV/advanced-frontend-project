import React from 'react';
/*import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
    title: 'shared/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {};*/
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { NotificationItem } from "./NotificationItem";
import { Notification } from '@/entities/Notification/model/types/notification';

const meta = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
    }
} satisfies Meta<typeof NotificationItem>

const notification: Notification = {
    id: '1',
    title: 'title',
    description: 'description'
}

export default meta;
type Story = StoryObj<typeof meta>

export const NotificationWithoutHref: Story = {
    args: {
        item: {
            id: '1',
            title: 'title',
            description: 'description'
        }
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const NotificationWithHref: Story = {
    args: {
        item: {
            id: '1',
            title: 'title',
            description: 'description',
            href: 'https://redux-toolkit.js.org/rtk-query/usage/code-splitting'
        }
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}
