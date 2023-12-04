import React, { createContext, useState } from 'react';

const ExpenseCtx = createContext({
  seteditExpense: (expense) => {},
  cleareditExpense: () => {},
  editexpenseData: "",
  id : " "
});

export const ExpenseContext = (props) => {
  const [editexpenseData, seteditExpensedata] = useState(null);
  const [id,setId] = useState("");

  const seteditExpense = (id) => {
    // seteditExpensedata(expense);
    console.log(id);
    setId(id);
    fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${id}.json`,{
        method : "GET"
    }).then(res=>{
        if(res.ok){
            return res.json();
        }
        else{
            return res.json().then(data=>{
                if(data && data.error && data.error.message){
                    alert(data.error.message);
                    console.log(data.error.message);
                }
            }

            )
        }
    }).then(data=>{
        console.log(data);
        seteditExpensedata(data);
    })
  };

  
  const cleareditExpense = () => {
    seteditExpensedata(null);
  };

  return (
    <ExpenseCtx.Provider value={{ seteditExpense, cleareditExpense, editexpenseData }}>
      {props.children}
    </ExpenseCtx.Provider>
  );
};

export default ExpenseCtx;
