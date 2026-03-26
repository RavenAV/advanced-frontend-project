import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { Drawer } from "./Drawer";

const meta = {
    title: 'shared/Drawer',
    component: Drawer,
    argTypes: {
    }
} satisfies Meta<typeof Drawer>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: (<div>
            <p>Text</p>
        </div>),
        isOpen: true
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}