import { createSlice, configureStore } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../src/stores/stores-toolkit'
// import { type } from "os";

//////////// Media screen state:
const initialState: boolean = window.matchMedia("(min-width: 769px)").matches;
const screenWidth = createSlice({
    name: "screen-width",
    initialState, // true for large screen (>=768px) and false is for small screen (<768px)
    reducers: {
        setLarge(state) {
            return (state = true);
        },

        setSmall(state) {
            return (state = false);
        },
    },
});
export const screenActions = screenWidth.actions;

///////////////////////////////////////////////
// store all slices:
const store = configureStore({
    reducer: {
        screenWidth: screenWidth.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
