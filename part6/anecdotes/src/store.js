import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/filterReducer.js";

export const configureStoreObj = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})