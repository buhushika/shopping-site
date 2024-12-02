import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const register = async (username, password, email) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (existingUsers.some(user => user.email === email)) {
      setSnackbarMessage('Email already registered');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    
    const newUser = { username, password, email };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setUser(newUser);

    setSnackbarMessage('Registration successful!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    return true;
  };

  const login = async (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
    const lowerCaseEmail = email.toLowerCase();
  
    const user = existingUsers.find(u => Object.values(u).includes(lowerCaseEmail));
  
    if (!user) {
      console.error('No user found with this email');
      return false;
    }
  
    const storedPassword = user.password.toLowerCase();
  
    if (storedPassword !== password.toLowerCase()) {
      return false;
    }
  
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'top',  
          horizontal: 'right',  
        }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
