import { StoryFn } from '@storybook/react-webpack5';
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import '@/app/styles/index.scss'
import { Theme } from '@/shared/const/theme'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
)
