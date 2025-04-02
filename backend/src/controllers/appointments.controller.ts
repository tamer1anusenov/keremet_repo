import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addDays, setHours, setMinutes, format, startOfDay, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const prisma = new PrismaClient();

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  appointmentDate: Date;
  status: string;
}

// Generate time slots for a given date
const generateTimeSlots = (date: Date) => {
  const slots = [];
  const startHour = 9; // Start at 9 AM
  const endHour = 18; // End at 6 PM
  const intervalMinutes = 60; // 1-hour intervals

  // Set the date to start of day to avoid any time-related issues
  const baseDate = startOfDay(date);

  for (let hour = startHour; hour < endHour; hour++) {
    const slotTime = setHours(baseDate, hour);
    const endTime = setHours(baseDate, hour + 1);

    slots.push({
      startTime: slotTime,
      endTime: endTime,
    });
  }

  return slots;
};

// Format date for display
const formatDateTime = (date: Date) => {
  return format(date, 'dd MMMM yyyy HH:mm', { locale: ru });
};

// Get available time slots for a doctor
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    
    // If date is provided, use it; otherwise use today
    const baseDate = date ? parseISO(date as string) : new Date();
    const nextWeek = addDays(baseDate, 7);

    // Get all appointments for the doctor in the next 7 days
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        appointmentDate: {
          gte: baseDate,
          lt: nextWeek,
        },
        status: 'CONFIRMED',
      },
    });

    // Generate all possible time slots for the next 7 days
    const allSlots = [];
    const slotsGroupedByDay: { [key: string]: any[] } = {};

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(baseDate, i);
      
      // Skip weekends
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const daySlots = generateTimeSlots(currentDate);
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        
        // Initialize the day's slots array if it doesn't exist
        if (!slotsGroupedByDay[formattedDate]) {
          slotsGroupedByDay[formattedDate] = [];
        }

        // Add slots for this day
        const availableDaySlots = daySlots.map(slot => {
          const isBooked = existingAppointments.some((appointment: Appointment) => 
            isSameDay(appointment.appointmentDate, slot.startTime) &&
            format(appointment.appointmentDate, 'HH:mm') === format(slot.startTime, 'HH:mm')
          );

          return {
            id: format(slot.startTime, 'yyyy-MM-dd-HH-mm'),
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: !isBooked,
            displayTime: format(slot.startTime, 'HH:mm'),
            displayDate: formatDateTime(slot.startTime),
          };
        });

        slotsGroupedByDay[formattedDate].push(...availableDaySlots);
        allSlots.push(...availableDaySlots);
      }
    }

    res.json({
      slots: allSlots,
      slotsByDay: slotsGroupedByDay,
    });
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to get available slots' });
  }
};

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId, timeSlotId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Parse the time slot ID to get the date and time
    const [year, month, day, hour, minute] = timeSlotId.split('-').map(Number);
    const appointmentDate = new Date(year, month - 1, day, hour, minute);

    // Check if the slot is already booked
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate,
        status: 'CONFIRMED',
      },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId: userId,
        appointmentDate,
        status: 'CONFIRMED',
      },
    });

    res.json({
      message: 'Appointment created successfully',
      appointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

// Get user's appointments
export const getUserAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: userId,
      },
      include: {
        doctor: true,
      },
      orderBy: {
        appointmentDate: 'asc',
      },
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error getting user appointments:', error);
    res.status(500).json({ error: 'Failed to get appointments' });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check if the appointment exists and belongs to the user
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        patientId: userId,
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update the appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: 'CANCELLED',
      },
    });

    res.json({
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
}; 