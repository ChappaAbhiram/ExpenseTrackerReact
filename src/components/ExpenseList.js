import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditExpenseData, fetchExpenses } from "../store/expense";

// Function to calculate total sum
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

const ExpenseList = (props) => {
  const expenses = useSelector((state) => state.expense.expensesData);
  const dispatch = useDispatch();

  const deleteExpense = (id) => {
    fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${id}.json`, {
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
    // Optionally, you can navigate to the edit form or another component
    // based on your application's structure.
    // props.history.push("/edit-form"); // Example navigation
  };

  // Calculate the total sum of expenses using the function
  const totalSum = calculateTotalSum(expenses || {});

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses && Object.entries(expenses).map(([id, expense]) => (
          <li key={id}>
            <strong>Money Spent:</strong> {expense.moneySpent}
            <br />
            <strong>Description:</strong> {expense.description}
            <br />
            <strong>Category:</strong> {expense.category}
            <button onClick={() => deleteExpense(id)}>Delete</button>
            <button onClick={() => editExpense(id)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Display total sum after all the expense items */}
      <div>
        {totalSum<=10000 && <p>Total Expenses: ${totalSum.toFixed(2)}</p>}
       { /* Conditionally render the "Activate Premium" button */}
        {totalSum > 10000 && <button>Total Expenses Crossed 10k Activate Premium</button>}
      </div>
    </div>
  );
};

export default ExpenseList;