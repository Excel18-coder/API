import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum quoteStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_REVIEW = 'In Review',
  CLOSED = 'Closed',
}

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  // Removed policy_number for quotes
  // policy_number: number;

  @Column()
  name: string;

  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  details: string;

  @Column()
  service_type: string;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  estimated_premium: number ;

  @Column({
    type: 'enum',
    enum: quoteStatus,
    default: quoteStatus.PENDING,
  })
  status: quoteStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
