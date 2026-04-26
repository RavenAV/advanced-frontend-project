import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticlesPage from "./ArticlesPage";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { RouteDecorator } from "@/shared/config/storybook/RouteDecorator/RouteDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta = {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ]
}