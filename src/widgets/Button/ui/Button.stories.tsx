import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, ThemeButton } from './Button';


const meta = {
  title: 'widgets/Button',
  component: Button,
  argTypes: {
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text'
  },
}

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.CLEAR
  },
}

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE
  },
}