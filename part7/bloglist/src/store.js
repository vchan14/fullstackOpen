import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js";

export const configureStoreObj = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
