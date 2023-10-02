import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState:{value:{id:0, name:"", email:"", password:"", clientKey:"", avatar:"", billPermission:false}},
    reducers:{
        login:(state, action) => {
            state.value = action.payload;
        }
    }
});

export const {login} = userSlice.actions;

export default userSlice.reducer;


