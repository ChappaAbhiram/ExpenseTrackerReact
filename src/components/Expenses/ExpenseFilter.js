import React from 'react';
import './ExpenseFilter.css';
import { useSelector } from 'react-redux';
function ExpenseFilter(props){
    const isDarkMode = useSelector((state) => state.theme.isDarkTheme);
    function dropdownChangeHandler(event){
     props.onChangeFilter(event.target.value)
    };
    return(
    <div className='expenses-filter'>
    <div className='expenses-filter__control'>
        <label className={isDarkMode ? 'darklabel' : 'lightlabel'}>Filter by Year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>
    </div>
    </div>
    )
}
export default ExpenseFilter;