import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name:"alert",
    initialState:{value:{text:"", type:0, isOpen:false }},
    reducers:{
        showAlert: (state, action) => {
            state.value = action.payload
        },

        closeAlert:(state, action) => {
            state.value.isOpen = false;
        }
    }
});

export const {showAlert} = alertSlice.actions;

export default alertSlice.reducer;