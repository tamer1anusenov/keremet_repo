import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Doctor, doctors, specialtyLabels, Specialty } from '../../data/doctors';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Выбор специалиста', 'Выбор врача', 'Выбор времени'];

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
}));

const TimeSlotButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&.selected': {
    backgroundColor: '#E6F4F8',
    borderColor: '#00A6B4',
    color: '#00A6B4',
    transform: 'scale(1.02)',
    boxShadow: '0 2px 8px rgba(0,166,180,0.2)',
  },
  '&:disabled': {
    backgroundColor: '#f5f5f5',
    borderColor: theme.palette.divider,
    color: theme.palette.text.disabled,
  },
  '&:hover:not(:disabled)': {
    backgroundColor: '#F5FBFD',
    transform: 'scale(1.02)',
  },
}));

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  isAvailable: boolean;
}

const AppointmentPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | ''>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Генерация тестовых временных слотов
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      times.forEach(time => {
        slots.push({
          id: `${date.toISOString().split('T')[0]}-${time}`,
          time,
          date: date.toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          }),
          isAvailable: Math.random() > 0.3 
        });
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const filteredDoctors = doctors.filter(doctor => 
    (!selectedSpecialty || doctor.specialization === selectedSpecialty) &&
    (!searchTerm || 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSpecialtySelect = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    handleNext();
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    handleNext();
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Сброс формы
      setActiveStep(0);
      setSelectedSpecialty('');
      setSelectedDoctor(null);
      setSelectedSlot(null);
    }, 3000);
  };

  const renderSpecialtySelection = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Выберите специализацию врача
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(specialtyLabels).map(([key, label]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <StyledCard 
              onClick={() => handleSpecialtySelect(key as Specialty)}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {label}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderDoctorSelection = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Выберите врача
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Поиск врача по имени или специализации"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
        }}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <StyledCard onClick={() => handleDoctorSelect(doctor)}>
              <CardMedia
                component="img"
                height="200"
                image={doctor.image}
                alt={`${doctor.firstName} ${doctor.lastName}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {doctor.lastName} {doctor.firstName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {specialtyLabels[doctor.specialization as keyof typeof specialtyLabels]}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderTimeSelection = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Выберите удобное время
      </Typography>
      {selectedDoctor && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1">
            Врач: {selectedDoctor.lastName} {selectedDoctor.firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {specialtyLabels[selectedDoctor.specialization as keyof typeof specialtyLabels]}
          </Typography>
        </Paper>
      )}
      <Grid container spacing={2}>
        {timeSlots.map((slot) => (
          <Grid item xs={6} sm={4} md={3} key={slot.id}>
            <TimeSlotButton
              variant="outlined"
              className={selectedSlot?.id === slot.id ? 'selected' : ''}
              disabled={!slot.isAvailable}
              onClick={() => handleTimeSlotSelect(slot)}
            >
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              {slot.time}
              {selectedSlot?.id === slot.id && (
                <CheckCircleIcon sx={{ fontSize: 16 }} />
              )}
            </TimeSlotButton>
            <Typography variant="caption" display="block" textAlign="center" mt={1}>
              {slot.date}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Запись на прием
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {showSuccess ? (
          <Alert 
            severity="success"
            icon={<CheckCircleIcon fontSize="inherit" />}
          >
            Запись успешно создана! Мы отправили подтверждение на вашу почту.
          </Alert>
        ) : (
          <>
            {activeStep === 0 && renderSpecialtySelection()}
            {activeStep === 1 && renderDoctorSelection()}
            {activeStep === 2 && renderTimeSelection()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ mr: 1 }}
              >
                Назад
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={!selectedSlot}
                    sx={{
                      backgroundColor: '#00A6B4',
                      '&:hover': { backgroundColor: '#009CA6' },
                    }}
                  >
                    Подтвердить запись
                  </Button>
                ) : null}
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AppointmentPage; 