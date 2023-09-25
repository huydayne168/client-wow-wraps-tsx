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

////// Authentication store:
const id = localStorage.getItem("currentUserId");
let authInit = {
    _id: id || "",
    accessToken: "",
};

const currentUser = createSlice({
    name: "currentUser",
    initialState: authInit,
    reducers: {
        storeUser(state, action) {
            localStorage.setItem("currentUserId", action.payload._id);
            return (state = {
                _id: action.payload._id,
                accessToken: action.payload.accessToken,
            });
        },

        storeNewAccessToken(state, action) {
            const newState = { ...state, accessToken: action.payload };
            return (state = newState);
        },

        logout(state) {
            state = {
                _id: "",
                accessToken: "",
            };
            localStorage.removeItem("currentUserId");
        },
    },
});

export const curUserActions = currentUser.actions;

///////////////////////////////////////////////
// store all slices:
const store = configureStore({
    reducer: {
        screenWidth: screenWidth.reducer,
        currentUser: currentUser.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
