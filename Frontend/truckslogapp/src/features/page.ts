import { createSlice } from "@reduxjs/toolkit";
import { Pages } from "../enums/pages";


export const pageSlice = createSlice({
    name:"page",
    initialState:{value:{page:Pages.LOGIN}},
    reducers:{
        switchPage:(state, action) => {
            state.value.page = action.payload;
        },
    }
});


export const {switchPage} = pageSlice.actions;

export default pageSlice.reducer;