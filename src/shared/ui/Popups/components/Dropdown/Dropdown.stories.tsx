import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { Dropdown } from "./Dropdown";
import { Button } from "@/widgets/Button/ui/Button";

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
    }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        trigger: <Button>open</Button>,
        items: [
            { content: 'first', onClick: () => {} },
            { content: 'second', onClick: () => {} },
            { content: 'third', onClick: () => {} },
        ]
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}