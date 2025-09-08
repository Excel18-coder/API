import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('outsourcing_requests')
export class OutsourcingRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  organization_name: string;

  @Column({ type: 'text' })
  core_functions: string;

  @Column({ length: 255 })
  location: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  services: unknown;

  @Column({ length: 255 })
  nature_of_outsourcing: string;

  @Column({ length: 255 })
  budget_range: string;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
