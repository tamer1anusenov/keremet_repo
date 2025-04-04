import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import RoleSelector, { UserRole } from '../../components/RoleSelector/RoleSelector';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [role, setRole] = useState<UserRole>('patient');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify({
      firstName: 'Иван',
      lastName: 'Иванов',
      email: formData.email,
      role: role
    }));
    
    // Get the redirect path from location state or default to role-specific dashboard
    const from = (location.state as any)?.from?.pathname || getDashboardPath(role);
    navigate(from);
  };

  const getDashboardPath = (userRole: UserRole): string => {
    switch (userRole) {
      case 'admin':
        return '/admin-dashboard';
      case 'doctor':
        return '/doctor-dashboard';
      case 'patient':
        return '/profile';
      default:
        return '/';
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вход в личный кабинет
          </Typography>
          
          <RoleSelector role={role} onRoleChange={handleRoleChange} />
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <RouterLink to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Нет аккаунта? Зарегистрироваться
              </RouterLink>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage; 