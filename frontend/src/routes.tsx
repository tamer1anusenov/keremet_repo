import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import DoctorsPage from './pages/Doctors/DoctorsPage';
import TestsPage from './pages/Tests/TestsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import ContactsPage from './pages/Contacts/ContactsPage';
import AboutPage from './pages/About/AboutPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tests" 
        element={
          <ProtectedRoute>
            <TestsPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes; 