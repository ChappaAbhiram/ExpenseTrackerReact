import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoggedin : false,
    token : '',
    userId : ''
}
const authSlice = createSlice({
    name : 'auth',
    initialState : initState,
    reducers : {
        login(state,action){
            state.isLoggedin = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout(state){
            state.isLoggedin = false;
            state.token = '';
            state.userId = '';
        },
        switchmode(state){
            state.isLoggedin = !state.isLoggedin;
        }

    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;