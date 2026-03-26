import { StoryFn } from '@storybook/react-webpack5'
import '@/app/styles/index.scss'

export const StyleDecorator = (Story: StoryFn) => (
  <Story />
)
