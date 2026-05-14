import 'app/styles/index.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize()

const preview = {
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
  ],
  loaders: [mswLoader]
}

export default preview
