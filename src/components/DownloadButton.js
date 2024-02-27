import React from 'react';
import { useSelector } from 'react-redux';
const DownloadButton = ()=>{
const expenses = useSelector(state=>state.expense.expensesData);
const downloadCsv = () => {
    let csvContent = "ExpenseID,Date,MoneySpent,Description,Category,Location\n";
    for (const id in expenses) {
      if (expenses.hasOwnProperty(id)) {
        const expense = expenses[id];
        console.log(id);
        csvContent += `${id},${expense.date},${expense.moneySpent},${expense.description},${expense.category},${expense.location}\n`;
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