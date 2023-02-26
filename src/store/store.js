import { configureStore } from "@reduxjs/toolkit";
import datasSlice from "./datas";
export const store = configureStore({
    reducer: {
        datas : datasSlice,
    }
});