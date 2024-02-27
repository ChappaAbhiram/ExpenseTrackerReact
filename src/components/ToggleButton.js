import React from 'react';
import { themeActions } from '../store/theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const ToggleButton = ()=>{
const dispatch = useDispatch();
const isDarktheme = useSelector(state=>state.theme.isDarkTheme);
const enableHandler = ()=>{
    dispatch(themeActions.enableTheme());
};
const disableHandler = ()=>{
    dispatch(themeActions.disableTheme());
}
return(
    <button onClick={isDarktheme ? disableHandler : enableHandler}>
      {isDarktheme ? 'Switch to light mode' : 'Switch to dark mode'}
    </button>
)

}
export default ToggleButton;