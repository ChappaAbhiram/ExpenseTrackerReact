import React, { useState, useRef, useContext,useEffect } from "react";
import ExpenseCtx from "../context/ExpenseContext";

const ExpenseForm = (props) => {
  
  const [formData, setFormData] = useState({
    moneySpent: "",
    description: "",
    category: "Food",
  });
  const ctx = useContext(ExpenseCtx);
  useEffect(()=>{
    if(ctx.editexpenseData){
      setFormData(ctx.editexpenseData);
    }
  },[ctx.editexpenseData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    const newExpense = {
      moneySpent: formData.moneySpent,
      description: formData.description,
      category: formData.category,
    };
    if(ctx.editexpenseData){
     fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${ctx.id}.json`,{
        method : "PUT",
        headers : {
        "Content-type" : "application/json"
        },
        body : JSON.stringify(newExpense)
     } ).then(res=>{
      return res.json();
     }).then(data=>{
      ctx.cleareditExpense();
      props.fetchExpenses();
      setFormData({
        moneySpent: "",
        description: "",
        category: "Food",
      });
      
     })
    }
    
      // Calling the addExpense function to add the new expense to the list
      else{
      props.addExpense(newExpense);
      setFormData({
        moneySpent: "",
        description: "",
        category: "Food",
      });
      }
  };

  return (
    <div>
      <h2>Enter Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moneySpent">Money Spent:</label>
          <input
            type="text"
            id="moneySpent"
            name="moneySpent"
            placeholder="Enter the amount"
            value={formData.moneySpent}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter a description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Movie">Movie</option>
            <option value="Loan and Credit Card bills">Loan and Credit Card Bills</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <button type="submit">{ctx.editexpenseData?"Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default ExpenseForm;

