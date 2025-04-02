import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';
import { Appointment } from '../models/Appointment';
import { TestResult } from '../models/TestResult';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development', // Set to false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Doctor, Appointment, TestResult],
  migrations: [],
  subscribers: [],
}); 