import React, { useState } from 'react';
import {  Button, TextField, Card, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SinginPage = () => {
  const navigate = useNavigate();

  const [currentCard, setCurrentCard] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyInitialAmount, setCompanyInitialAmount] = useState('');

  const handleNext = () => {
    setCurrentCard(currentCard + 1);
  };

  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleSignIn = async () => {
    // Send data to the server
    const formData = {
      userName,
      userEmail,
      userPassword,
      userConfirmPassword,
      profession,
      companyName,
      companySize,
      companyInitialAmount,
    };

     // Redirect to the dashboard
     navigate('/login');

    {/* 
    const response = await fetch('http://localhost:8080/CRM/signindata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      // Handle error
      console.error('Error:', response.statusText);
    }
*/}
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <h1>Sign In</h1>
      {currentCard === 0 && (
        // Card 1: User Information
        <Card elevation={3} style={{ width: '300px', padding: '20px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>User Information</h2>
            <TextField
              label="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" style={{ width: '100%' }}>
              {currentCard > 0 && <Button onClick={handleBack}>Back</Button>}
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </Box>
        </Card>
      )}

      {currentCard === 1 && (
        // Card 2: Profession Selection
        <Card elevation={3} style={{ width: '300px', padding: '20px'}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Choose Your Profession</h2>
            <TextField
              select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
          {/*    <option value="">Select...</option> */}
              <option value="Fashion Boutiques">Fashion Boutiques</option>
              <option value="Coffee Shops">Coffee Shops</option>
              <option value="Web Design Studios">Web Design Studios</option>
              <option value="Fitness Centers">Fitness Centers</option>
              <option value="Pet Grooming Services">Pet Grooming Services</option>
              <option value="Handmade Jewelry Shops">Handmade Jewelry Shops</option>
              <option value="Consulting Firms">Consulting Firms</option>
              <option value="Food Trucks">Food Trucks</option>
              <option value="Event Planning Companies">Event Planning Companies</option>
              <option value="Bookstores">Bookstores</option>
            </TextField>
            <Box display="flex" justifyContent="space-between" style={{ width: '100%' }}>
              {currentCard > 0 && <Button onClick={handleBack}>Back</Button>}
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </Box>
        </Card>
      )}

      {currentCard === 2 && (
        // Card 3: Company Information
        <Card elevation={3} style={{ width: '300px', padding: '20px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Company Information</h2>
            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label="Company Size"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            />
            <TextField
              label="Initial Amount"
              value={companyInitialAmount}
              onChange={(e) => setCompanyInitialAmount(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" style={{ width: '100%' }}>
              {currentCard > 0 && <Button onClick={handleBack}>Back</Button>}
              <Button onClick={handleSignIn}>Sign In</Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default SinginPage;
