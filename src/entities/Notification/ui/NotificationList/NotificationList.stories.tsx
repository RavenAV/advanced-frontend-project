import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { NotificationList } from "./NotificationList";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { http, HttpResponse } from 'msw'

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
        /*mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        title: 'Notification 1',
                        description: 'Notification description 1'
                    },
                    {
                        id: '2',
                        title: 'Notification 2',
                        description: 'Notification description 2'
                    },
                    {
                        id: '3',
                        title: 'Notification 3',
                        description: 'Notification description 3'
                    }
                ]
            }
        ]*/
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
