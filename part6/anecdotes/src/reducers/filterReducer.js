

// Reducer
import {createSlice} from "@reduxjs/toolkit";
//
// const filterReducer = (state = '', action) => {
//     console.log('hii hihih ', state, action)
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }
//
//
// // Action creator
// export const filterChange = filter => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter,
//     }
// }

// // Before need to do
// dispatch(filterChange('my new filter '));
//
//
// // now
// dispatch(filterChange('my new filter '));

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})



// export default filterReducer


export const {filterChange} = filterSlice.actions;
export default filterSlice.reducer;