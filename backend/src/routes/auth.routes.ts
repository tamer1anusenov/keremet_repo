import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';
import { UserRole } from '../models/User';

const router = Router();

router.post(
  '/register',
  [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('inn')
      .isLength({ min: 12, max: 12 })
      .withMessage('INN must be 12 digits')
      .matches(/^\d+$/)
      .withMessage('INN must contain only numbers'),
    body('phone')
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/)
      .withMessage('Invalid phone number format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('role')
      .optional()
      .customSanitizer(value => value?.toUpperCase())
      .isIn(Object.values(UserRole))
      .withMessage('Role must be either "PATIENT" or "DOCTOR"'),
  ],
  register
);

router.post(
  '/login',
  [
    body('identifier').notEmpty().withMessage('Email or INN is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

export default router; 