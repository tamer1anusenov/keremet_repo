import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({
      firstName: 'Иван',
      lastName: 'Иванов',
      email: formData.email
    }));
    
    // Get the redirect path from location state or default to profile
    const from = (location.state as any)?.from?.pathname || '/profile';
    navigate(from);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вход в личный кабинет
          </Typography>
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