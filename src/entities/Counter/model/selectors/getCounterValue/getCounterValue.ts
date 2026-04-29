import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";
import { CounterSchema } from "../../types/counterSchema";
import { buildSelector } from "@/shared/lib/store";

// createSelector мемоизирует значение выходного селектора
/*export const getCounterValue =  createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value
)*/

// нужный хук + сам селектор
// селектор можем использовать в asyncthunk, хелперах и тд
// хук используем напрямую в компонентах
// это нужно для того, чтобы каждый раз не использовать useSelector в компонентах
export const [useCounterValue, getCounterValue] = buildSelector(
    state => state.counter.value
)