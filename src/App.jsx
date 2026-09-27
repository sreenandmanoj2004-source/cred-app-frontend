import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';


const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/auth`;

function App() {
  

  

  

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="*" element={<NotFound  />} />
      </Routes>
    </>
   
  );
}

const appStyles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#ecfdf5', 
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  }
};

export default App;