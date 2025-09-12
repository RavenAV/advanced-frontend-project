import { Decorator, StoryFn } from '@storybook/react-webpack5'
import 'app/styles/index.scss'


//export const StyleDecorator = (story: () => Story) => story()
export const StyleDecorator = (Story: StoryFn) => (
  <Story />
)
