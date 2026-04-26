import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from  "@/shared/const/theme";
import { ArticleSortSelector } from "./ArticleSortSelector";
import { ArticleSortField } from "@/entities/Article/model/consts/consts";
import { action } from "@storybook/addon-actions";

const meta = {
    title: 'entities/Articles/ArticleSortSelector',
    component: ArticleSortSelector,
    argTypes: {
    },
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primery: Story = {
    args: {
        sort: ArticleSortField.CREATED,
        order: 'asc',
        onChangeOrder: () => { },
        onChangeSort: () => { }
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ]
}