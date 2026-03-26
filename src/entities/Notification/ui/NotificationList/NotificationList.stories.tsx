import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { NotificationList } from "./NotificationList";

const meta = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
    }
} satisfies Meta<typeof NotificationList>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}
