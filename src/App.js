import React from 'react';
import Header from './Header/Header';
import { Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import NewPassword from './ResetPassword/ResetPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import './App.css';
import Profile from './Profile/Profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
