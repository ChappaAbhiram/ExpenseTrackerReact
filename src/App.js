import React from 'react';
import AuthForm from "./components/AuthForm";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './Routepages/Homepage';
import Profile from './Routepages/Profile';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Homepage />} exact>
      </Route>
      <Route path="/" element={<AuthForm />}>
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
