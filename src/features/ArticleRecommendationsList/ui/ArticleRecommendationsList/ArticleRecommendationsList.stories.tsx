import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouteDecorator } from '@/shared/config/storybook/RouteDecorator/RouteDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { http, HttpResponse } from 'msw'

const meta = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
    },
    decorators: [
        RouteDecorator,
        StoreDecorator({})
    ]
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.LIGHT)
    ],
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/articles`, () => {
                    return HttpResponse.json([
                        {
                            id: '1',
                            title: 'Javascript news',
                            subtitle: 'Что нового в JS за 2022 год?',
                            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                            views: 1022,
                            createdAt: '26.02.2022',
                            user: {
                                id: '1',
                                username: 'admin'
                            },
                            type: ['IT', 'SCIENCE', 'ECONOMICS'],
                            blocks: []
                        },
                        {
                            id: '2',
                            title: 'Javascript news',
                            subtitle: 'Что нового в JS за 2022 год?',
                            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
                            views: 1022,
                            createdAt: '26.02.2022',
                            user: {
                                id: '1',
                                username: 'admin'
                            },
                            type: ['IT', 'SCIENCE', 'ECONOMICS'],
                            blocks: []
                        }
                    ])
                }),
            ],
        }
    }
}