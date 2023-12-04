import React from 'react';
import AuthForm from "./components/AuthForm";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Routepages/Homepage';
import Profile from './Routepages/Profile';
import { ExpenseContext } from './context/ExpenseContext';

function App() {
  return (
    <BrowserRouter>
      <ExpenseContext>
        <Routes>
          <Route path="/home" element={<Homepage />} exact />
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ExpenseContext>
    </BrowserRouter>
  );
}

export default App;
