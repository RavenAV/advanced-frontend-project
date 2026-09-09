import { useJsonSettings } from "@/entities/User";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext"
import { Theme } from "@/shared/const/theme";
import { FC, useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        children,
        initialTheme
    } = props
    const { theme: defaultTheme } = useJsonSettings()
    const [isThemeInited, setIsThemeInited] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT)

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setIsThemeInited(true)
        }
    }, [defaultTheme])

    useEffect(() => {
        // чтобы цвета скролла подстраивались под тему навешиваем класс с темой и на body
        // потому что до этого на самом документе скролл висит
        // рнаьше был на вложенной части на компоненте page
        // и цвета применялись, потому что накладывали на app
        // а сейчас цвета на самом верхнем уровне - документе
        document.body.className = theme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
    }, [theme])

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}