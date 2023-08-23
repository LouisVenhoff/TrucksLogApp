import {PayloadAction, createSlice} from "@reduxjs/toolkit";


export const loadingScreenSlice = createSlice({
    name:"laodingScreen",
    initialState:{value:{isShowed:false}},
    reducers:{
        switchLoadingScreen:(state, action:PayloadAction<boolean>) => {

        state.value.isShowed = action.payload;

        }
    }
});


export const {switchLoadingScreen}  = loadingScreenSlice.actions;


export default loadingScreenSlice.reducer;



