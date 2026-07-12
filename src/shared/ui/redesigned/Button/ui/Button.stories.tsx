import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, ButtonSize, ButtonVariant } from './Button';
import { Theme } from  "@/shared/const/theme";
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

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
    variant: 'clear'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const ClearDark: Story = {
  args: {
    children: 'Text',
    variant: 'clear'
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}

export const Outline: Story = {
  args: {
    children: 'Text',
    variant: 'outline'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OutlineSizeL: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
    size: 'l'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const OutlineSizeXL: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
    size: 'xl'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

export const DisabledBtn: Story = {
  args: {
    children: '>',
    variant: 'outline',
    disabled: true
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}