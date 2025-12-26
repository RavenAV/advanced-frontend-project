import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ArticleTextBlockComponent } from "./ArticleTextBlockComponent";

const meta = {
    title: 'entities/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    argTypes: {
    }
} satisfies Meta<typeof ArticleTextBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.LIGHT)]
}