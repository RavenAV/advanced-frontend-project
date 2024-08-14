type Mods = Record<string, boolean | string>

// предназначена для того чтобы удобно комбинировать классы, особенно если есть какие-либо условия
export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ]
        .join(' ')
}
