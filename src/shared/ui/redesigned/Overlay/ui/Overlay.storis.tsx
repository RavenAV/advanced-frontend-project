import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { Overlay } from "./Overlay";

const meta = {
    title: 'shared/Overlay',
    component: Overlay,
    argTypes: {
    }
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}