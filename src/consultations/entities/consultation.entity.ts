import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ConsultationStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum ConsultType {
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

  @Column({ type: 'enum', enum: ConsultType })
  consult_type: ConsultType;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ length: 100, nullable: true, default: 'General' })
  service_type: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({
    type: 'enum',
    enum: ConsultationStatus,
    default: ConsultationStatus.PENDING,
  })
  status: ConsultationStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
