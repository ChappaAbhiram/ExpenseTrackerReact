// Inside ExpenseList.js

import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
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
