import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isError: false,
    message: "",
  },
  reducers: {
    notificationUpdate(state, action) {
      return action.payload;
    },
    notificationClear(state, action) {
      return {
        isError: false,
        message: "",
      };
    },
  },
});

export const setNotification = (myNotification, time = 5) => {
  return async (dispatch) => {
    dispatch(notificationUpdate(myNotification));
    setTimeout(() => {
      dispatch(notificationClear());
    }, time * 1000);
  };
};

export const { notificationUpdate, notificationClear } =
  notificationSlice.actions;
export default notificationSlice.reducer;
