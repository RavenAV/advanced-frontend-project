import { StoryFn } from '@storybook/react-webpack5';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider'
import 'app/styles/index.scss'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
)
