import { Router } from 'express';
import { auth } from '../middleware/auth';
import { 
  getAvailableSlots,
  createAppointment,
  getUserAppointments,
  cancelAppointment,
} from '../controllers/appointments.controller';

const router = Router();

// Get available time slots for a doctor
router.get('/available-slots/:doctorId', auth, getAvailableSlots);

// Create a new appointment
router.post('/', auth, createAppointment);

// Get user's appointments
router.get('/user', auth, getUserAppointments);

// Cancel an appointment
router.delete('/:appointmentId', auth, cancelAppointment);

export default router; 