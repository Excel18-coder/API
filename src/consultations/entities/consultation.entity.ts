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

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 255 })
  country: string;

  @Column({ length: 255 })
  timezone: string;

  @Column({ length: 255 })
  service_interest: string;

  @Column({ length: 255 })
  service_type: string;

  @Column({ type: 'timestamp' })
  scheduled_at: Date;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  meeting_link: string | null;

  @Column({ type: 'int', nullable: true })
  duration: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
