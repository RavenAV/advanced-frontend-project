import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticleDetailsPageHeader from "./ArticleDetailsPageHeader";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: 'pages/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    argTypes: {
    }
} satisfies Meta<typeof ArticleDetailsPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}