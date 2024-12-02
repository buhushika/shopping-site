import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    setLoading(true);
    setError(''); 
  
    try {
      const success = await login(email, password);
  
      if (!success) {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
      console.error('Login error:', err);
    } finally {
      setLoading(false); 
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
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error} 
          helperText={error && error === 'Invalid credentials' ? 'Email not found' : error} 
          />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error} 
          helperText={error && error === 'Invalid credentials' ? 'Incorrect password' : error} 
          />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#ff6f61',
            '&:hover': { bgcolor: '#ff3d33' },
            mt: 2
          }}
          fullWidth
          onClick={handleLogin}
          disabled={loading} 
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
