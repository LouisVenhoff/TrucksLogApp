import { createSlice } from "@reduxjs/toolkit";


export const menuSlice = createSlice({
    name:"menu",
    initialState:{value:{opened:false}},
    reducers:{
        setOpened: (state, action) => {
            state.value.opened = action.payload;
        }   
    }
});


export const {setOpened} = menuSlice.actions;


export default menuSlice.reducer;