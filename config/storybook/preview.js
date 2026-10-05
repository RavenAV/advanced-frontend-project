import 'app/styles/index.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { FeatureFlagsDecorator } from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator'
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
    //RouteDecorator,
    FeatureFlagsDecorator({})
  ],
  loaders: [mswLoader]
}

export default preview