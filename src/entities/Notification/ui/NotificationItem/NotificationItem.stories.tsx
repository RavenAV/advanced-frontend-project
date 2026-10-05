import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { NotificationItem } from "./NotificationItem";
import { NewDesignDecorator } from "@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator";

const meta = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
    }
} satisfies Meta<typeof NotificationItem>

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


export const NotificationWithoutHrefRedesigned: Story = {
    args: {
        item: {
            id: '1',
            title: 'title',
            description: 'description'
        }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        NewDesignDecorator
    ]
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
