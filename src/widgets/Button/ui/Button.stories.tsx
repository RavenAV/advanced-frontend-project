import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

const meta = {
  title: 'widgets/Button',
  component: Button,
  argTypes: {
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
  args: {
    children: 'Text'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const PrimaryDark: Story = {
  args: {
    children: 'Text'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const ClearLight: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ClearDark: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const ClearInvertedLight: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ClearInvertedDark: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OutlineSizeL: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OutlineSizeXL: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BackgroundTheme: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const BackgroundInvertedTheme: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const SquareSizeM: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.M
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const SquareSizeL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const SquareSizeXL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}