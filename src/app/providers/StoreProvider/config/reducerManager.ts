import { combineReducers, ReducersMapObject, Reducer } from "@reduxjs/toolkit"
import { MountedReducers, ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema"

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers)

    // храним названия редюсеров, которые хотим удалить
    let keysToRemove: Array<StateSchemaKey> = []
    const mountedReducers: MountedReducers = {}

    return {
        // просто возвращает редюсер
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        // эта функция и есть редюсер, но есть условие, что если есть ключи для удаления, то эти ключи из стейта удалются
        reduce: (state: StateSchema, action: any) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },
        // добавляет в редюсер по ключу новый редюсер
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!reducers[key] && !key) {
                return
            }

            reducers[key] = reducer
            mountedReducers[key] = true
            combinedReducer = combineReducers(reducers)
        },
        // добавляет ключ в массив и удаляет из редюсера
        remove: (key: StateSchemaKey) => {
            if (!reducers[key] && !key) {
                return
            }

            delete reducers[key]
            mountedReducers[key] = false
            keysToRemove.push(key)
            
            combinedReducer = combineReducers(reducers)
        },

    }
}