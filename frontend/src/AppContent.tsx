import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DoctorsPage from './pages/Doctors/DoctorsPage';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import TestsPage from './pages/Tests/TestsPage';
import ContactsPage from './pages/Contacts/ContactsPage';
import AboutPage from './pages/About/AboutPage';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { Box } from '@mui/material';

const AppContent: React.FC = () => {
  return (
    <Router>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/tests" element={<TestsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default AppContent; 