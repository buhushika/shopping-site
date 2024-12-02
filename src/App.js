import React from 'react';
import { useAuth, AuthContextProvider } from './login/AuthContext';
import { Container, Box, Tabs, Tab, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Register from './login/Register';
import Login from './login/Login';
import Dashboard from './components/Dashboard';
import bgImage from "./Images/bg.jpg";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter> 
        <Routes>
          <Route path="/*" element={<MainAppContent />} /> 
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

function MainAppContent() {
  const { user } = useAuth();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); 
  };

  if (user) {
    return <Dashboard />; 
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
        textAlign="center"
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          maxWidth: 'sm',
        }}
      >
        <Typography variant="h4" gutterBottom >
          Welcome
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              color: 'black', 
              '&.Mui-selected': {
                color: '#ff3d33', 
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ff6f61', 
            },
          }}
        >
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
        <Box mt={2}>
          <TabPanel value={tabIndex} index={0}>
            <Register />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Login />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}


export default App;
