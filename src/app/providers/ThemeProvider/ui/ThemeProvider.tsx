import { useJsonSettings } from "@/entities/User";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext"
import { Theme } from "@/shared/const/theme";
import { FC, useEffect, useMemo, useState } from "react";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        children,
        initialTheme
    } = props
    const { theme: defaultTheme } = useJsonSettings()
    const [isThemeInited, setIsThemeInited] = useState<boolean>(false)
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT)

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setIsThemeInited(true)
        }
    }, [defaultTheme])

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