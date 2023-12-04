// Inside ExpenseList.js

import React,{useContext} from "react";
import ExpenseCtx from "../context/ExpenseContext";

// Inside ExpenseList.js

// ... (other imports)

const ExpenseList = (props) => {
  const expensearray = [];
  const ctx = useContext(ExpenseCtx);

  for (const id in props.expenses) {
    if (props.expenses.hasOwnProperty(id)) {
      const expense = props.expenses[id];
      expensearray.push({ id, ...expense });
    }
  }
  // props.fetchExpenses();

  const deleteExpense = (id) => {
    console.log(id)
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
        // Fetch the updated expenses after deleting
        props.fetchExpenses();
      });
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expensearray.map((expense) => (
          <li key={expense.id}>
            <strong>Money Spent:</strong> {expense.moneySpent}
            <br />
            <strong>Description:</strong> {expense.description}
            <br />
            <strong>Category:</strong> {expense.category}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            <button onClick={() => ctx.seteditExpense(expense.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
