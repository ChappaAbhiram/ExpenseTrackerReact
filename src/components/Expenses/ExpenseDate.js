import './ExpenseDate.css'
import React from 'react';
function ExpenseDate(props){
    const dateObject = new Date(props.date);

    // Extract year from the Date object
    const month = dateObject.toLocaleString('en-US',{month:'long'});
    const year = dateObject.getFullYear();
    const day = dateObject.toLocaleString('en-US',{day:'2-digit'});
    return (
        <div className="expense-date">
        <div className="expense-date__month">{month}</div>
        <div className="expense-date__year">{year}</div>
        <div className="expense-date__day">{day}</div>
      </div>
    );
}
export default ExpenseDate;