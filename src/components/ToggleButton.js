import React from 'react';
import { themeActions } from '../store/theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const ToggleButton = ()=>{
const dispatch = useDispatch();
const isDarktheme = useSelector(state=>state.theme.isDarkTheme);
const toggleHandler = ()=>{
    dispatch(themeActions.toggletheme())
};
return(
    <button onClick={toggleHandler}>
        {isDarktheme?'Switch to light mode' : 'Switch to dark mode'}
    </button>
)

}
export default ToggleButton;