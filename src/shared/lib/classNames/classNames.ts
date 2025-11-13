export type Mods = Record<string, boolean | string | undefined>

// предназначена для того чтобы удобно комбинировать классы, особенно если есть какие-либо условия
export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = []
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className)
    ]
        .join(' ')
}
