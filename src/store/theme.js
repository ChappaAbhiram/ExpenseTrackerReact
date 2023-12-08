import { createSlice } from "@reduxjs/toolkit";
const initstate = {
    isDarkTheme : false
}

const themeSlice = createSlice({
 name : "theme",
 initialState : initstate,
 reducers : {
    toggletheme(state){
        state.isDarkTheme = !state.isDarkTheme;
    }
 }
});

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;