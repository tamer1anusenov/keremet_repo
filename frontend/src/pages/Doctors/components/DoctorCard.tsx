import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Doctor, specialtyLabels } from '../../../data/doctors';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  backgroundColor: '#E6F4F8',
  color: '#00A6B4',
  fontSize: '2.5rem',
}));

const AppointmentButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: '#00A6B4',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#009CA6',
  },
  padding: theme.spacing(1, 3),
}));

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect }) => {
  const getInitials = () => {
    return `${doctor.firstName.charAt(0)}${doctor.lastName.charAt(0)}`;
  };

  const fullName = [
    doctor.lastName,
    doctor.firstName,
    doctor.patronymic,
  ].filter(Boolean).join(' ');

  return (
    <StyledCard>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
        <StyledAvatar>{getInitials()}</StyledAvatar>
        
        <Typography
          variant="h6"
          component="h3"
          sx={{
            textAlign: 'center',
            mb: 1,
            color: '#1A2D4A',
            fontWeight: 600,
          }}
        >
          {fullName}
        </Typography>

        <Typography
          variant="subtitle1"
          color="primary"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: '#00A6B4',
            fontWeight: 500,
          }}
        >
          {specialtyLabels[doctor.specialization as keyof typeof specialtyLabels]}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            Стаж: {doctor.experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doctor.description}
          </Typography>
        </Box>

        <AppointmentButton
          variant="contained"
          fullWidth
          onClick={onSelect}
        >
          Записаться на прием
        </AppointmentButton>
      </CardContent>
    </StyledCard>
  );
};

export default DoctorCard; 