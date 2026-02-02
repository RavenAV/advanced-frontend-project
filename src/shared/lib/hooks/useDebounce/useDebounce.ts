import { MutableRefObject, useCallback, useRef } from "react"


export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>
    // каждый раз вызывается функция, таймер очищается, потом создается новый
    return useCallback((...args: any[]) => {
        // до тех пор, пока этот таймер очищается ф-я вызвана не будет, но как только это очищение закончится будет вызван колбэк
        if (timer.current) {
            clearTimeout(timer.current)
        }
        
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}