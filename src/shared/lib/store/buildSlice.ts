import { bindActionCreators, createSlice } from "@reduxjs/toolkit"
import { SliceCaseReducers, CreateSliceOptions } from "@reduxjs/toolkit/dist";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
export function buildSlice<
    State,
    caseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(options: CreateSliceOptions<State, caseReducers, Name>) {
    const slice = createSlice(options)
    // для каждого слайса будет генерироваться хук, который биндит диспатч сразу к экшенам
    // потом его называем как угодно и используем без диспатча
    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch()

        // @ts-ignore
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch])
    }

    return {
        ...slice,
        useActions
    }
}