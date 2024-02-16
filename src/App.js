import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import CustomerList from './components/CustomerList';
import ExpenseCalculation from './components/ExpenseCalculation';
import ProductList from './components/ProductList';
import CustomersFeedback from './components/CustomersFeedback';
import LoginPage from './components/LoginPage';
import {Box,Container } from '@mui/material';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <Router basename="/TestReact">
        {isLoggedIn ? <Navbar userName={userName} onLogout={handleLogout} /> :<></>}
        <div className="content">
          <Box component="main" sx={{ flexGrow: 10, p: 3 }}>
            <Container>
              <Routes>
              <Route path="/" element={<LoginPage setUserName={setUserName} onLogin={handleLogin} />} />
                <Route path="/dashboard" element={isLoggedIn ? <DashBoard /> : <Navigate to="/" />} />
                <Route path="/customers" element={isLoggedIn ? <CustomerList /> : <Navigate to="/" />} />
                <Route path="/expensecalculation" element={isLoggedIn ? <ExpenseCalculation /> : <Navigate to="/" />} />
                <Route path="/product" element={isLoggedIn ? <ProductList /> : <Navigate to="/" />} />
                <Route path="/customersfeedback" element={isLoggedIn ? <CustomersFeedback /> : <Navigate to="/" />} />
              </Routes>
            </Container>
          </Box>
        </div>
      </Router>
    </div>
  );
}

export default App;
