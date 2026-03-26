import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

const meta = {
  title: 'shared/Input',
  component: Input,
  argTypes: {
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputLight: Story = {
  args: {
    placeholder: 'Type text',
    value: '123'
  },
  decorators: [ThemeDecorator(Theme.LIGHT)]
}

