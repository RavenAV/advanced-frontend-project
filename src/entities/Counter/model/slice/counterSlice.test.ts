import { counterActions, counterReducer } from "./counterSlice";
import { StateSchema } from "@/app/providers/StoreProvider";
import { CounterSchema } from "../types/counterSchema";

describe('counterSlice', () => {
    test('increment', () => {
        const state: CounterSchema = { value: 10 }
        expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 11 })
    });

    test('decrement', () => {
        const state: CounterSchema = { value: 10 }
        expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: 9 })
    });

    test('should work with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
    });
})