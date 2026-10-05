import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { AvatarDropdown } from "./AvatarDropdown";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
    }
} satisfies Meta<typeof AvatarDropdown>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            user: {
                authData: {}
            }
        })
    ]
}