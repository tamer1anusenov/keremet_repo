import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Appointment } from './Appointment';

export enum Specialization {
  THERAPIST = 'therapist',
  CARDIOLOGIST = 'cardiologist',
  NEUROLOGIST = 'neurologist',
  PEDIATRICIAN = 'pediatrician',
  SURGEON = 'surgeon',
  DENTIST = 'dentist',
  OPHTHALMOLOGIST = 'ophthalmologist',
  DERMATOLOGIST = 'dermatologist',
  PSYCHIATRIST = 'psychiatrist',
  ENDOCRINOLOGIST = 'endocrinologist',
}

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.doctorProfile)
  user: User;

  @Column({
    type: 'enum',
    enum: Specialization
  })
  @IsNotEmpty()
  specialization: Specialization;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  education: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  experience: string;

  @Column('text')
  @IsString()
  description: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 