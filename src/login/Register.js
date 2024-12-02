import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    // Check if all fields are filled
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    // If all fields are filled and email is valid, proceed with registration
    const isRegistered = register(username, password, email);
    if (isRegistered) {
      setErrorMessage('');  // Clear any previous error messages
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={1}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errorMessage.includes('valid email')}
          helperText={errorMessage.includes('valid email') && 'Please enter a valid email.'}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && !errorMessage.includes('valid email') && (
          <Typography color="error" variant="body2" mt={2}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{
            bgcolor: '#ff6f61',
            '&:hover': { bgcolor: '#ff3d33' },
            mt: 2
          }}
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
