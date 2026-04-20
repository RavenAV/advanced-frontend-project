import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import ArticleRating from "./ArticleRating";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import withMock from "storybook-addon-mock";

const meta = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
    },
    decorators: [
        withMock
    ]
} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRating: Story = {
    args: {
        articleId: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            user: {
                authData: {
                    id: '1'
                }
            }
        })
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/article-ratings?userId=1&articleId=1`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        rate: 4
                    }
                ]
            }
        ]
    }
}

export const WithoutRating: Story = {
    args: {
        articleId: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            user: {
                authData: {
                    id: '1'
                }
            }
        })
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/article-ratings?userId=1&articleId=1`,
                method: 'GET',
                status: 200,
                response: []
            }
        ]
    }
}