import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { ArticleViewSelector } from "./ArticleViewSelector";
import { ArticleView } from "@/entities/Article";

const meta = {
    title: 'entities/Articles/ArticleViewSelector',
    component: ArticleViewSelector,
    argTypes: {
    },
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Small: Story = {
    args: {
        view: ArticleView.SMALL
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}

export const Big: Story = {
    args: {
        view: ArticleView.BIG
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}