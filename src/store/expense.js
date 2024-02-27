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
export const fetchExpenses = () => async (dispatch,getState) => {
  const email = getState().auth.userId;
  const modifiedmail = email.replace(/[.@]/g, '');
  try {
    const response = await fetch(`https://expense-tracker-43d55-default-rtdb.firebaseio.com/expenses/${modifiedmail}.json`, {
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
export const fetchEditExpenseData = (id) => async (dispatch,getState) => {
    console.log(id);
    const email = getState().auth.userId;
    const modifiedmail = email.replace(/[.@]/g, '');
  try {
    const response = await fetch(`https://expense-tracker-43d55-default-rtdb.firebaseio.com/expenses/${modifiedmail}/${id}.json`, {
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
