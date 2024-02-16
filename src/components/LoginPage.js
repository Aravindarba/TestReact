import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserName , onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    // Send the user's credentials to the server
    const response = await fetch('http://localhost:8080/CRM/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: email, userPassword: password })
    });

    if (response.ok) {
      // If the login was successful, store the JWT
      const token = await response.text();
      localStorage.setItem('token', token);
      setUserName(email);
      onLogin();
      navigate('/dashboard');
      console.error("Logged in")
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
