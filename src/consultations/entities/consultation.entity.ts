import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum consultationStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}
export enum consultType {
  ONLINE = 'Online',
  PHYSICAL = 'Physical',
}

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  full_name: string;


  @Column({ length: 100 })
  phone: string;



  @Column({ type: 'timestamp' })
  time: Date;


  @Column({ type:'enum', enum: consultType })
  consult_type: consultType;

  @Column({ type: 'timestamp' })
  date: Date;


}