import { CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entities/Article";
import { CounterSchema } from "entities/Counter"
import { UserSchema } from "entities/User";
import { AddCommentFormSchema } from "features/AddCommentForm";
import { LoginSchema } from "features/AuthByUsername";
import { ProfileSchema } from "features/EditableProfileCard";
import { UISchema } from "features/UI";
import { ArticleDetailsPageSchema } from "pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "pages/ArticlesPage"
import { rtkApi } from "shared/api/rtkApi";

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    ui: UISchema

    // Асинхронные редюсеры
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
    articleDetailsPage?: ArticleDetailsPageSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer> // вот так мы получаем типы из rtkApi
}

export type StateSchemaKey = keyof StateSchema // полкчаем ключи по типу 'counter'
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: any) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    // true - редюсер вмонтирован, false - не вмонтирован
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    extra: ThunkExtraArg
    rejectValue: T
    state: StateSchema
}