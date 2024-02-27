import { createSlice } from "@reduxjs/toolkit";

const storedAuthState = localStorage.getItem("authState");
let initState = {
  isLoggedin: false,
  token: "",
  userId: ""
};

// If there's storedAuthState in localStorage, parse and use it as initialState
if (storedAuthState) {
  initState = JSON.parse(storedAuthState);
}
const authSlice = createSlice({
    name : 'auth',
    initialState : initState,
    reducers : {
        login(state,action){
            state.isLoggedin = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem("authState", JSON.stringify(state));
        },
        logout(state){
            state.isLoggedin = false;
            state.token = '';
            state.userId = '';
            localStorage.removeItem("authState");
        },
        switchmode(state){
            state.isLoggedin = !state.isLoggedin;
        }

    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;