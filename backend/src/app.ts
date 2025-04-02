import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import appointmentsRouter from './routes/appointments.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentsRouter);

export default app; 