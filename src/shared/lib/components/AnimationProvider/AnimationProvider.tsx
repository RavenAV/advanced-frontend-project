import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"

type SpringType = typeof import("@react-spring/web")
type GestureType = typeof import("@use-gesture/react")

interface AnimationContextPayload {
    Spring?: SpringType
    Gesture?: GestureType
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

// обе библиотеки зависят друг от друга, используются вместе
// и эта ф-я завершится только тогда, когда обе они будут загружены
const getAsyncAnimationModules = async () => {
    // параллельно подгружаем библиотеки
    return Promise.all([
        import("@react-spring/web"),
        import("@use-gesture/react"),
    ])
}

export const useAnimationLibs = () => {
    // указывает, что поля не будут undefined
    return useContext(AnimationContext) as Required<AnimationContextPayload>
}

// для ленивой загрузки анимационных библиотек
export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
    const SpringRef = useRef<SpringType>()
    const GestureRef = useRef<GestureType>()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getAsyncAnimationModules()
            .then(([spring, gesture]) => {
                SpringRef.current = spring
                GestureRef.current = gesture
                setIsLoaded(true)
            })
    }, [])

    const defaultValue = useMemo(() => ({
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
        isLoaded
    }), [isLoaded])

    return (
        <AnimationContext.Provider
            value={defaultValue}
        >
            {children}
        </AnimationContext.Provider>
    )
}