import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticleEditPage from "./ArticleEditPage";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { RouteDecorator } from "@/shared/config/storybook/RouteDecorator/RouteDecorator";

const meta = {
    title: 'pages/ArticleEditPage',
    component: ArticleEditPage,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticleEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ]
}