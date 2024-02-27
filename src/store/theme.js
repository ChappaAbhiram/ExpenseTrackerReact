import { createSlice } from "@reduxjs/toolkit";
// Check if dark mode is enabled in localStorage
const isDarkModeEnabled = localStorage.getItem("isDarkMode") === "true";

// Check if premium mode is enabled in localStorage
const isPremiumActivated = localStorage.getItem("isPremiumActivated") === "true";

const initialState = {
    isDarkTheme: isDarkModeEnabled,
    isPremiumActivated: isPremiumActivated,
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        enableTheme(state) {
            state.isDarkTheme = true;
            localStorage.setItem("isDarkMode", state.isDarkTheme);
        },
        disableTheme(state){
            state.isDarkTheme = false;
            localStorage.removeItem("isDarkMode");
        },
        enablePremium(state) {
            state.isPremiumActivated = true;
            localStorage.setItem("isPremiumActivated", state.isPremiumActivated);
        },
        disablePremium(state) {
            state.isPremiumActivated = false;
            localStorage.removeItem("isPremiumActivated");
        }
    }
});


export default themeSlice.reducer;
export const themeActions = themeSlice.actions;