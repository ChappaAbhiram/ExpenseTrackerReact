import React from 'react';
import { useSelector } from 'react-redux';
const DownloadButton = ()=>{
const expenses = useSelector(state=>state.expense.expensesData);
const downloadCsv = () => {
    let csvContent = "ExpenseID,MoneySpent,Description,Category\n";
    for (const id in expenses) {
      if (expenses.hasOwnProperty(id)) {
        const expense = expenses[id];
        csvContent += `${id},${expense.moneySpent},${expense.description},${expense.category}\n`;
      }
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
  return <button onClick={downloadCsv}>Download Expenses CSV</button>;
};

export default DownloadButton;