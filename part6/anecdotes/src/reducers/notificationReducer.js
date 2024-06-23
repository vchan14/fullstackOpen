import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationUpdate(state, action) {
            return action.payload
        },
        notificationClear(state, action) {
            return ''
        }
    }
})


export const {notificationUpdate, notificationClear} = notificationSlice.actions
export default notificationSlice.reducer