import React, { useState, useRef, useContext,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";
import { fetchExpenses } from "../store/expense";
const ExpenseForm = (props) => {
  
  const edit = useSelector(state=>state.expense.editexpenseData);
  const expenseid = useSelector(state=>state.expense.id)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    moneySpent: "",
    description: "",
    category: "Food",
  });
  // const ctx = useContext(ExpenseCtx);
  useEffect(()=>{
    if(edit){
      console.log(edit);
      setFormData(edit);
    }
  },[edit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const addExpense=(newExpense)=>{
    fetch("https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses.json",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newExpense)
        
    }).then(res=>{
        if(res.ok){
            return res.json();
        }
        else{
            return res.json.then(data=>{
                if(data && data.error && data.error.message){
                    alert(data.error.message);
                    console.log(data.error.message);
                }
            })
        }
    }).then(data=>{
        console.log(data);
        dispatch(fetchExpenses());
    });
  }     
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  
    const newExpense = {
      moneySpent: formData.moneySpent,
      description: formData.description,
      category: formData.category,
    };
  
    if (edit) {
      console.log(expenseid);
      try {
        await fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${expenseid}.json`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newExpense),
        });
  
        // Dispatch actions after updating the expense
        dispatch(expenseActions.clearEditExpensedata());
        dispatch(fetchExpenses());
  
        // Reset the form data
        setFormData({
          moneySpent: "",
          description: "",
          category: "Food",
        });
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    } else {
      try {
        await fetch("https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        });
  
        // Dispatch actions after adding a new expense
        dispatch(fetchExpenses());
  
        // Reset the form data
        setFormData({
          moneySpent: "",
          description: "",
          category: "Food",
        });
      } catch (error) {
        console.error("Error adding expense:", error);
      }
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
        <button type="submit">{edit?"Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default ExpenseForm;

