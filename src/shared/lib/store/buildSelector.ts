import { StateSchema } from "@/app/providers/StoreProvider"
import { useSelector } from "react-redux"

type Selector<T> = (state: StateSchema) => T
// функция которая возвращает нужный тип, второе - селектор
type Result<T> = [() => T, Selector<T>]

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => {
        return useSelector(selector)
    }

    return [
        useSelectorHook,
        selector
    ]
}