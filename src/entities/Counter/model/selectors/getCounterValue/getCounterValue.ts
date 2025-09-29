import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";
import { CounterSchema } from "../../types/counterSchema";

// createSelector мемоизирует значение выходного селектора
export const getCounterValue =  createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value
)