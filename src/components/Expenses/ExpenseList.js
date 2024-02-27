// ExpenseList.js

import React, { useState } from "react";
import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditExpenseData, fetchExpenses } from "../../store/expense";
import ToggleButton from "../ToggleButton";
import DownloadButton from "../DownloadButton";
import  "./ExpenseList.css"; // Import the styles;
import {themeActions} from "../../store/theme";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
const calculateTotalSum = (expenses) => {
  let totalSum = 0;
  for (const id in expenses) {
    if (expenses.hasOwnProperty(id)) {
      const expense = expenses[id];
      totalSum += Number(expense.moneySpent) || 0;
    }
  }
  return totalSum;
};
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};
const ExpenseList = (props) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkTheme);
    const premiumActivated = useSelector((state) => state.theme.isPremiumActivated);
  const expenses = useSelector((state) => state.expense.expensesData);
  const mail = useSelector(state=>state.auth.userId);
  const email = mail.replace(/[.@]/g, '');
  const dispatch = useDispatch();
  const [filteredYear, setFilteredYear] = useState('2024');
  const filterChangeHandler = (selectedYear)=>{
      setFilteredYear(selectedYear);
    }
    const expensesArray = expenses ? Object.entries(expenses) : [];
    const filteredexpenses = expensesArray.filter(([id, expense]) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear().toString();
      return expenseYear === filteredYear;
    });
    const expensesvaluesarray = Object.values(expenses);
  const deleteExpense = (id) => {
    fetch(`https://expense-tracker-43d55-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              alert(data.error.message);
              console.log(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(fetchExpenses());
      });
  };

  const editExpense = (id) => {
    console.log(id);
    dispatch(fetchEditExpenseData(id));
  };

  // Calculate the total sum of expenses using the function
  const activatePremiumHandler = () => {
    if (totalSum > 10000) {
      dispatch(themeActions.enablePremium());
    }
  };
  const totalSum = calculateTotalSum(expenses || {});

  return (
    <div className={` ${isDarkMode ? 'darkMode' : 'expenseListContainer'}`}>
      <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler}></ExpenseFilter>
      <ExpenseChart expenses={expensesvaluesarray}/>
      <h2>Expenses</h2>
      <ul >
      {expenses &&
        filteredexpenses.map(([id, expense]) => (
          <li key={id} className="expense-item">
          <Card >
            <div className="expense-content">
              <ExpenseDate date={expense.date} />
              <ExpenseDetails
                title={expense.description}
                amount={expense.moneySpent}
                location={expense.location}
                category={expense.category}
              />
            </div>
            <div className="button-container">
              <button className="edit-button" onClick={() => editExpense(id)}>Edit</button>
              <button className="delete-button" onClick={() => deleteExpense(id)}>Delete</button>
            </div>
          </Card>
        </li>
        
        ))}
    </ul>

      <div className='totalSum'>
          <p>Total Expenses: Rs.{totalSum.toFixed(2)}</p>
      </div>

      {/* Conditionally render the "Activate Premium" button */}
      {totalSum > 10000 && !premiumActivated && (
        <button className='premiumButton' onClick={activatePremiumHandler}>
          Activate Premium
        </button>
      )}

      {/* Conditionally render the "Download" and "Toggle" buttons */}
      {(premiumActivated && totalSum>10000) && (
        <div className='premiumFeatures'>
          <DownloadButton />
          <ToggleButton />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

