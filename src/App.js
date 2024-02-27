import React from 'react';
import AuthForm from "./components/AuthForm";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Routepages/Homepage';
import Profile from './Routepages/Profile';
import { useSelector } from 'react-redux';

function App() {
  const isdarkTheme = useSelector(state=>state.theme.isDarkTheme);
  return (
    <div style={{ background: isdarkTheme ? "black" : "#fff", color: isdarkTheme ? "#333" : "#333" }}> 
    <BrowserRouter>

        <Routes>
          <Route path="/home" element={<Homepage />} exact />
          <Route path="/" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
