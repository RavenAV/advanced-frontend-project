import { Meta, StoryObj } from "@storybook/react-webpack5";
import ArticlesPageFilters from "./ArticlesPageFilters";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

const meta = {
    title: 'pages/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
    }
} satisfies Meta<typeof ArticlesPageFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}