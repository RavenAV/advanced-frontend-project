import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticlesPage from "./ArticlesPage";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
    }
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}