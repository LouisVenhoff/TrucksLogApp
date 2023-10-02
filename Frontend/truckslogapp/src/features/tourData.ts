import { createSlice } from "@reduxjs/toolkit";



export const tourSlice = createSlice({
    name:"tour",
    initialState:{value:{tourId:0}},
    reducers:{
        select:(state, action) => {
            state.value.tourId = action.payload
        }
    }
});


export const {select} = tourSlice.actions;

export default tourSlice.reducer;