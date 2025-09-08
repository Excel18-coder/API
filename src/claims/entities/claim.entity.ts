import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export  enum claimStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_REVIEW = 'In Review',
  CLOSED = 'Closed',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  user_id: number;
  @Column()
  policy_number: number;
  @Column()
  claim_type: string;
  @Column()
  incident_date: Date;
  @Column()
  estimated_loss: number;
  @Column()
  description: string;
  @Column()
  status: claimStatus;
  @Column()
  submitter_email: string;
  @Column()
  submitter_name: string;
  @Column()
  submitter_phone: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
