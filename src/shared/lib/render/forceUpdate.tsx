import { createContext, ReactNode, useContext, useMemo, useState } from "react";

// просто как костыль для обновления интерфейса после изменения флага
const ForceUpdateContext = createContext({
    value: true,
    forceUpdate: () => {}
})

export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext)
    
    return forceUpdate
}

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(true)

    const forceUpdate = () => {
        setValue(prev => !prev)
        setTimeout(() => {
            setValue(prev => !prev)
        }, 0)
    }

    const valueContext = useMemo(() => {
        return {
            value,
            forceUpdate
        }
    }, [value])

    // получается так, что на долю секунды интерфейс исчезает
    // мы children, который передается в провайдер уничтожаем
    // и отрисовываем вместо него null
    // но при этом по таймауту через тик мы возвращаем обратно значение true
    // и children снова отрисовывается
    if (!value) return null

    return (
        <ForceUpdateContext.Provider value={valueContext}>
            {children}
        </ForceUpdateContext.Provider>
    )
}