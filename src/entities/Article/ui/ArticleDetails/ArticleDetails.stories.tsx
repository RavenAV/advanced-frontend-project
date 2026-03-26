import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { ArticleDetails } from "./ArticleDetails";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Article } from "@/entities/Article/model/types/article";
import { ArticleBlockType, ArticleType } from "@/entities/Article/model/consts/consts";
import { RouteDecorator } from "@/shared/config/storybook/RouteDecorator/RouteDecorator";

const meta = {
    title: 'entities/Articles/ArticleDetails',
    component: ArticleDetails,
    argTypes: {
    },
    decorators: [RouteDecorator]
} satisfies Meta<typeof ArticleDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const article: Article = {
    "id": "1",
    "title": "Javascript new",
    "subtitle": "What's new in JS",
    "img": "https://www.clipartmax.com/png/middle/147-1474351_javascript-icon.png",
    "views": 100,
    "createdAt": "26.10.2025",
    "user": {
        "id": "1",
        "username": "admin"
    },
    "type": [
        ArticleType.IT
    ],
    "blocks": [
        {
            "id": "1",
            "type": ArticleBlockType.TEXT,
            "title": "Block title",
            "paragraphs": [
                "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
                "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы."
            ]
        },
        {
            "id": "4",
            "type": ArticleBlockType.CODE,
            "code": "alert(\"Hello, world!\")"
        },
        {
            "id": "5",
            "type": ArticleBlockType.TEXT,
            "title": "Block title",
            "paragraphs": [
                "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
                "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы."
            ]
        },
        {
            "id": "2",
            "type": ArticleBlockType.IMAGE,
            "src": "https://habrastorage.org/r/w1560/getpro/habr/post_images/757/2da/ce9/7572dace9bf67861dcdc2f9539c0810d.png",
            "title": "Img title"
        },
        {
            "id": "2",
            "type": ArticleBlockType.CODE,
            "code": "console.log(\"Hello, world!\")"
        }
    ]
}

export const Primary: Story = {
    args: {
        id: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            articleDetails: {
                data: article
            }
        })
    ]
}

export const Loading: Story = {
    args: {
        id: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            articleDetails: {
                isLoading: true
            }
        })
    ]
}

export const Error: Story = {
    args: {
        id: '1'
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
        StoreDecorator({
            articleDetails: {
                error: 'error'
            }
        })
    ]
}