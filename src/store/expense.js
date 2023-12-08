import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expensesData: "",
  editexpenseData: "",
  id: " ",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    setExpensesData: (state, action) => {
      state.expensesData = action.payload;
    },
    setEditExpenseData: (state, action) => {
      state.editexpenseData = action.payload.data;
      state.id = action.payload.id;
      console.log(action.payload)
    },
    clearEditExpensedata: (state) => {
      state.editexpenseData = "";
      state.id = "";
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

// Async action creator to fetch expenses data
export const fetchExpenses = () => async (dispatch) => {
  try {
    const response = await fetch("https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error.message);
      console.log(data.error.message);
      return;
    }

    const data = await response.json();
    dispatch(expenseActions.setExpensesData(data));
  } catch (error) {
    console.error(error);
  }
};

// Async action creator to fetch edit expense data
export const fetchEditExpenseData = (id) => async (dispatch) => {
    console.log(id);
  try {
    const response = await fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: "GET",
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error.message);
      console.log(data.error.message);
      return;
    }

    const data = await response.json();
    console.log(data);
    dispatch(expenseActions.setEditExpenseData({data,id}));
  } catch (error) {
    console.error(error);
  }
};


    // const initialState = {
    //   expensesData: "",
    //   editexpenseData: "",
    //   id: " ",
    //   status: 'idle',
    //   error: null,
    // };
    
    // const expenseSlice = createSlice({
    //   name: 'expense',
    //   initialState,
    //   reducers: {
    //     fetchExpensesSuccess(state, action) {
    //       state.status = 'succeeded';
    //       state.expensesData = action.payload;
    //     },
    //     fetchExpensesFailed(state, action) {
    //       state.status = 'failed';
    //       state.error = action.payload;
    //     },
    //     setEditExpenseDataSuccess(state, action) {
    //       state.status = 'succeeded';
    //       state.editexpenseData = action.payload;
    //       state.id = action.payload.id;
    //     },
    //     setEditExpenseDataFailed(state, action) {
    //       state.status = 'failed';
    //       state.error = action.payload;
    //     },
    //     clearEditExpenseData(state) {
    //       state.editexpenseData = "";
    //     },
    //     deleteExpenseSuccess(state, action) {
    //         console.log(action.payload);
    //       state.status = 'succeeded';
    //     },
    //     deleteExpenseFailed(state, action) {
    //       state.status = 'failed';
    //       state.error = action.payload;
    //     },
    //   },
    // });
    
    // export const {
    //   fetchExpensesSuccess,
    //   fetchExpensesFailed,
    //   setEditExpenseDataSuccess,
    //   setEditExpenseDataFailed,
    //   clearEditExpenseData,
    //   deleteExpenseSuccess,
    //   deleteExpenseFailed,
    // } = expenseSlice.actions;
    
    //  const fetchExpenses = () => async (dispatch) => {
    //   try {
    //     const response = await fetch("https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses.json", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });
    
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch expenses");
    //     }
    
    //     const data = await response.json();
    //     dispatch(fetchExpensesSuccess(data));
    //   } catch (error) {
    //     dispatch(fetchExpensesFailed(error.message));
    //   }
    // };
    
    //  const setEditExpenseData = (id) => async (dispatch) => {
    //   try {
    //     const response = await fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${id}.json`, {
    //       method: "GET"
    //     });
    
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch edit expense data");
    //     }
    
    //     const data = await response.json();
    //     dispatch(setEditExpenseDataSuccess(data));
    //   } catch (error) {
    //     dispatch(setEditExpenseDataFailed(error.message));
    //   }
    // };
    
    //  const deleteExpense = (id) => async (dispatch) => {
    //   try {
    //     const response = await fetch(`https://expensetrackernew-ec752-default-rtdb.firebaseio.com/expenses/${id}.json`, {
    //       method: "DELETE"
    //     });
    
    //     if (!response.ok) {
    //       throw new Error("Failed to delete expense");
    //     }
    
    //     dispatch(deleteExpenseSuccess());
    //     // Optionally, dispatch additional actions or handle other state updates after successful deletion
    //   } catch (error) {
    //     dispatch(deleteExpenseFailed(error.message));
    //   }
    // };
    
    // export default expenseSlice.reducer;
    // export const expenseActions = {
    //     // Synchronous actions
    //     fetchExpensesSuccess,
    //     fetchExpensesFailed,
    //     setEditExpenseDataSuccess,
    //     setEditExpenseDataFailed,
    //     clearEditExpenseData,
    //     deleteExpenseSuccess,
    //     deleteExpenseFailed,
        
    //     // Asynchronous actions
    //     fetchExpenses,
    //     setEditExpenseData,
    //     deleteExpense,
    //   };
    
