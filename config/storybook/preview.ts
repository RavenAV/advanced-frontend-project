import type { Preview } from '@storybook/react-webpack5'
import 'app/styles/index.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator'
import { Theme } from '../../src/app/providers/ThemeProvider'

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    StyleDecorator,
    //ThemeDecorator(Theme.LIGHT) - don't work
    //RouteDecorator
  ]
};
