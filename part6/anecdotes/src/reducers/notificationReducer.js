import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'This is notification!',
    reducers: {
        notificationUpdate(state, action) {
            return action.payload
        }
    }
})


export const {notificationUpdate} = notificationSlice.actions
export default notificationSlice.reducer