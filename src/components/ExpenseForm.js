import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expense";
import { fetchExpenses } from "../store/expense";
import classes from "./ExpenseForm.module.css"; 

const ExpenseForm = (props) => {
  const edit = useSelector((state) => state.expense.editexpenseData);
  const mail = useSelector((state) => state.auth.userId);
  const email = mail.replace(/[.@]/g, "");
  const expenseid = useSelector((state) => state.expense.id);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    moneySpent: "",
    description: "",
    category: "Food",
    date:  "",
    location : ""
  });

  useEffect(() => {
    if (edit) {
      console.log(edit);
      setFormData(edit);
    }
  }, [edit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addExpense = async (newExpense) => {
    console.log(email);
    const mall = "expenses" + email;
    console.log(mall);
    await fetch(`https://expense-tracker-43d55-default-rtdb.firebaseio.com/expenses/${email}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json.then((data) => {
          if (data && data.error && data.error.message) {
            alert(data.error.message);
            console.log(data.error.message);
          }
        });
      }
    }).then((data) => {
      console.log(data);
      dispatch(fetchExpenses());
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    const newExpense = {
      moneySpent: formData.moneySpent,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      location : formData.location
    };

    if (edit) {
      console.log(expenseid);
      try {
        await fetch(`https://expense-tracker-43d55-default-rtdb.firebaseio.com/expenses/${email}/${expenseid}.json`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newExpense),
        });
        dispatch(expenseActions.clearEditExpensedata());
        dispatch(fetchExpenses());
        setFormData({
          moneySpent: "",
          description: "",
          category: "Food",
          date: "",
          location : ""
        });
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    } else {
      try {
        addExpense(newExpense);
        setFormData({
          moneySpent: "",
          description: "",
          category: "Food",
          date: "",
          location : ""
        });
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <Fragment>
      <h2>Enter Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.newexpensecontrols}>
        <div className={classes.newexpensecontrol}>
          <label htmlFor="description">Title:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter a title"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.newexpensecontrol}>
          <label htmlFor="moneySpent">Money Spent in Rupees:</label>
          <input
            type="number"
            id="moneySpent"
            name="moneySpent"
            placeholder="Enter the amount"
            value={formData.moneySpent}
            onChange={handleInputChange}
            required
            min = '1'
            step = '1'
          />
        </div>
        <div className={classes.newexpensecontrol}>
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
            <option value="Shopping">Shopping</option>
          </select>
        </div>
        <div className={classes.newexpensecontrol}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min='2019-01-01' max='2025-12-31'
          />
        </div>
        <div className={classes.newexpensecontrol}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter a location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit" className={classes.submitbutton}>{edit ? "Update" : "Submit"}</button>
      </form>
    </Fragment>
  );
};
export default ExpenseForm;


