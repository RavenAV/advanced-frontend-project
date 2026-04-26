import type { StateSchema, StateSchemaKey, ThunkConfig } from "./config/StateSchema";
import { AppDispatch, createReduxStore } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type { ReduxStoreWithManager } from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    StateSchemaKey
}

export type { AppDispatch, ThunkConfig, StateSchema, ReduxStoreWithManager }