import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticleEditPage from "./ArticleEditPage";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: 'pages/ArticleEditPage',
    component: ArticleEditPage,
    argTypes: {
    }
} satisfies Meta<typeof ArticleEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}