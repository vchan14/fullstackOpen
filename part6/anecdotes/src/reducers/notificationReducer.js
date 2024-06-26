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

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(notificationUpdate(message))
        setTimeout(() => {
            dispatch(notificationClear())
        }, time * 1000)
    }
}


export const {notificationUpdate, notificationClear} = notificationSlice.actions
export default notificationSlice.reducer