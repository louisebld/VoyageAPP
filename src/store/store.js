import { configureStore } from "@reduxjs/toolkit";
import datasSlice from "./datas";
import mapSlice from "./map";

export const store = configureStore({
    reducer: {
        datas: datasSlice,
        map: mapSlice,
    }
});