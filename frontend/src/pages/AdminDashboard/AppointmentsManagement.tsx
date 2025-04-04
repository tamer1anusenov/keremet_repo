import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Event as EventIcon,
} from '@mui/icons-material';

// Интерфейс для данных о приеме
interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Интерфейс для данных о докторе
interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

// Интерфейс для данных о пациенте
interface Patient {
  id: string;
  name: string;
}

const AppointmentsManagement: React.FC = () => {
  // Моковые данные о врачах
  const doctors: Doctor[] = [
    { id: '1', name: 'Иванов Иван Иванович', specialization: 'Терапевт' },
    { id: '2', name: 'Петрова Мария Александровна', specialization: 'Кардиолог' },
    { id: '3', name: 'Сидоров Алексей Петрович', specialization: 'Невролог' },
    { id: '4', name: 'Кузнецова Елена Сергеевна', specialization: 'Эндокринолог' },
    { id: '5', name: 'Козлов Дмитрий Александрович', specialization: 'Хирург' },
  ];

  // Моковые данные о пациентах
  const patients: Patient[] = [
    { id: '1', name: 'Смирнов Алексей Иванович' },
    { id: '2', name: 'Соколова Анна Петровна' },
    { id: '3', name: 'Морозов Дмитрий Сергеевич' },
    { id: '4', name: 'Васильева Ольга Александровна' },
    { id: '5', name: 'Попов Сергей Николаевич' },
  ];

  // Моковые данные о приемах
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'Смирнов Алексей Иванович',
      doctorId: '1',
      doctorName: 'Иванов Иван Иванович',
      date: '2024-04-15',
      time: '10:00',
      reason: 'Плановый осмотр',
      status: 'scheduled',
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Соколова Анна Петровна',
      doctorId: '2',
      doctorName: 'Петрова Мария Александровна',
      date: '2024-04-15',
      time: '11:30',
      reason: 'Консультация',
      status: 'scheduled',
    },
    {
      id: '3',
      patientId: '3',
      patientName: 'Морозов Дмитрий Сергеевич',
      doctorId: '3',
      doctorName: 'Сидоров Алексей Петрович',
      date: '2024-04-16',
      time: '09:00',
      reason: 'Головные боли',
      status: 'scheduled',
    },
    {
      id: '4',
      patientId: '4',
      patientName: 'Васильева Ольга Александровна',
      doctorId: '4',
      doctorName: 'Кузнецова Елена Сергеевна',
      date: '2024-04-10',
      time: '14:00',
      reason: 'Проблемы с щитовидной железой',
      status: 'completed',
      notes: 'Назначены анализы',
    },
    {
      id: '5',
      patientId: '5',
      patientName: 'Попов Сергей Николаевич',
      doctorId: '5',
      doctorName: 'Козлов Дмитрий Александрович',
      date: '2024-04-05',
      time: '16:30',
      reason: 'Консультация перед операцией',
      status: 'cancelled',
      notes: 'Отменено пациентом',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    reason: '',
    status: 'scheduled',
  });

  // Обработчик поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Обработчик изменения фильтра статуса
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  // Фильтрация приемов
  const filteredAppointments = appointments.filter(appointment => {
    // Фильтр по поисковому запросу
    const searchMatch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase());

    // Фильтр по статусу
    const statusMatch = statusFilter === 'all' || appointment.status === statusFilter;

    return searchMatch && statusMatch;
  });

  // Обработчики для диалогов
  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedAppointment) {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === selectedAppointment.id ? selectedAppointment : appointment
        )
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedAppointment) {
      setAppointments(prevAppointments =>
        prevAppointments.filter(appointment => appointment.id !== selectedAppointment.id)
      );
      setIsDeleteDialogOpen(false);
    }
  };

  const handleAddAppointment = () => {
    const newId = (Math.max(...appointments.map(a => parseInt(a.id))) + 1).toString();
    
    setAppointments(prevAppointments => [
      ...prevAppointments,
      {
        id: newId,
        ...newAppointment,
      }
    ]);
    
    setIsAddDialogOpen(false);
    setNewAppointment({
      patientId: '',
      patientName: '',
      doctorId: '',
      doctorName: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      reason: '',
      status: 'scheduled',
    });
  };

  // Обработчики изменения значений в форме нового приема
  const handlePatientChange = (event: SelectChangeEvent) => {
    const patientId = event.target.value;
    const patient = patients.find(p => p.id === patientId);
    
    setNewAppointment({
      ...newAppointment,
      patientId,
      patientName: patient ? patient.name : '',
    });
  };

  const handleDoctorChange = (event: SelectChangeEvent) => {
    const doctorId = event.target.value;
    const doctor = doctors.find(d => d.id === doctorId);
    
    setNewAppointment({
      ...newAppointment,
      doctorId,
      doctorName: doctor ? doctor.name : '',
    });
  };

  // Обработчики изменения значений в форме редактирования приема
  const handleEditPatientChange = (event: SelectChangeEvent) => {
    const patientId = event.target.value;
    const patient = patients.find(p => p.id === patientId);
    
    setSelectedAppointment(prev => 
      prev ? {
        ...prev,
        patientId,
        patientName: patient ? patient.name : '',
      } : null
    );
  };

  const handleEditDoctorChange = (event: SelectChangeEvent) => {
    const doctorId = event.target.value;
    const doctor = doctors.find(d => d.id === doctorId);
    
    setSelectedAppointment(prev => 
      prev ? {
        ...prev,
        doctorId,
        doctorName: doctor ? doctor.name : '',
      } : null
    );
  };

  // Получение цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Получение текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Запланирован';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Управление приемами
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Добавить прием
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск по пациенту, врачу или причине"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery('')} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              label="Статус"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="all">Все статусы</MenuItem>
              <MenuItem value="scheduled">Запланированные</MenuItem>
              <MenuItem value="completed">Завершенные</MenuItem>
              <MenuItem value="cancelled">Отмененные</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Пациент</TableCell>
                <TableCell>Врач</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Время</TableCell>
                <TableCell>Причина</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.doctorName}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(appointment.status)}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(appointment)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(appointment)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Нет данных для отображения
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Диалог редактирования приема */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактирование приема</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Пациент</InputLabel>
                <Select
                  value={selectedAppointment?.patientId || ''}
                  label="Пациент"
                  onChange={handleEditPatientChange}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Врач</InputLabel>
                <Select
                  value={selectedAppointment?.doctorId || ''}
                  label="Врач"
                  onChange={handleEditDoctorChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialization})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Дата"
                type="date"
                value={selectedAppointment?.date || ''}
                onChange={(e) => setSelectedAppointment(prev => 
                  prev ? { ...prev, date: e.target.value } : null
                )}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Время"
                type="time"
                value={selectedAppointment?.time || ''}
                onChange={(e) => setSelectedAppointment(prev => 
                  prev ? { ...prev, time: e.target.value } : null
                )}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Причина"
                value={selectedAppointment?.reason || ''}
                onChange={(e) => setSelectedAppointment(prev => 
                  prev ? { ...prev, reason: e.target.value } : null
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={selectedAppointment?.status || 'scheduled'}
                  label="Статус"
                  onChange={(e: SelectChangeEvent) => setSelectedAppointment(prev => 
                    prev ? { ...prev, status: e.target.value as Appointment['status'] } : null
                  )}
                >
                  <MenuItem value="scheduled">Запланирован</MenuItem>
                  <MenuItem value="completed">Завершен</MenuItem>
                  <MenuItem value="cancelled">Отменен</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Примечания"
                multiline
                rows={3}
                value={selectedAppointment?.notes || ''}
                onChange={(e) => setSelectedAppointment(prev => 
                  prev ? { ...prev, notes: e.target.value } : null
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            Вы действительно хотите удалить прием пациента "{selectedAppointment?.patientName}" 
            к врачу "{selectedAppointment?.doctorName}" 
            на {selectedAppointment ? new Date(selectedAppointment.date).toLocaleDateString() : ''} в {selectedAppointment?.time}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог добавления приема */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Добавление нового приема</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Пациент</InputLabel>
                <Select
                  value={newAppointment.patientId}
                  label="Пациент"
                  onChange={handlePatientChange}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Врач</InputLabel>
                <Select
                  value={newAppointment.doctorId}
                  label="Врач"
                  onChange={handleDoctorChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialization})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Дата"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Время"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Причина"
                value={newAppointment.reason}
                onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Примечания"
                multiline
                rows={3}
                value={newAppointment.notes || ''}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Отмена</Button>
          <Button 
            onClick={handleAddAppointment} 
            variant="contained" 
            color="primary"
            disabled={!newAppointment.patientId || !newAppointment.doctorId || !newAppointment.date || !newAppointment.time || !newAppointment.reason}
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentsManagement; 