import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { NotificationButton } from "./NotificationButton";

const meta = {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
    }
} satisfies Meta<typeof NotificationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}