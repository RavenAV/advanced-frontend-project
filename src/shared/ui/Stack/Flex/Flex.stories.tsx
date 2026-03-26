import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Flex } from "./Flex";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";

const meta = {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
    }
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rov: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        direction: 'row'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const Column: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        direction: 'column'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const RovGap4: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        gap: '4',
        direction: 'row'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const RovGap8: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        gap: '8',
        direction: 'row'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const RovGap16: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        gap: '16',
        direction: 'row'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ColumnGap4: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        direction: 'column',
        gap: '4'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ColumnGap8: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        direction: 'column',
        gap: '8'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ColumnGap16: Story = {
    args: {
        children: (
            <>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </>
        ),
        direction: 'column',
        gap: '16'
    },
    decorators: [ThemeDecorator(Theme.LIGHT)]
}