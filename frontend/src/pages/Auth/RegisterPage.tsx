import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    // Simulate successful registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    }));
    
    // Redirect to profile page
    navigate('/profile');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Регистрация
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Имя"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Фамилия"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
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
            <TextField
              fullWidth
              label="Подтверждение пароля"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
              Зарегистрироваться
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <RouterLink to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Уже есть аккаунт? Войти
              </RouterLink>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage; 