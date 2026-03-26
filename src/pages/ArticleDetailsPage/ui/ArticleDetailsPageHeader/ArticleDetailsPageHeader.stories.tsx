import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticleDetailsPageHeader from "./ArticleDetailsPageHeader";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { RouteDecorator } from "@/shared/config/storybook/RouteDecorator/RouteDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta = {
    title: 'pages/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    argTypes: {
    },
    decorators: [
        RouteDecorator
    ]
} satisfies Meta<typeof ArticleDetailsPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({})
    ]
}