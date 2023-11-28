// Inside ExpenseList.js

import React from "react";

const ExpenseList = ({ expenses }) => {
  const expensearray = [];
  for (const id in expenses) {
    if (expenses.hasOwnProperty(id)) {
      const expense = expenses[id];
      expensearray.push({ id, ...expense });
    }
  }
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
