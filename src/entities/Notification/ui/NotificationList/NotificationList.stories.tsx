import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { NotificationList } from "./NotificationList";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { http, HttpResponse } from 'msw'
import { NewDesignDecorator } from "@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator";

const meta = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
    },
    decorators: [
    ]
} satisfies Meta<typeof NotificationList>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ],
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/notifications`, () => {
                    return HttpResponse.json([
                        { id: '1', title: 'Notification 1', description: '...' },
                        { id: '2', title: 'Notification 2', description: '...' },
                    ]);
                }),
            ],
        },
    }
}

export const PrimaryRedesigned: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({}),
        NewDesignDecorator
    ],
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/notifications`, () => {
                    return HttpResponse.json([
                        { id: '1', title: 'Notification 1', description: '...' },
                        { id: '2', title: 'Notification 2', description: '...' },
                    ]);
                }),
            ],
        },
    }
}
