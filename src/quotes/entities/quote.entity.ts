import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 50 })
    phone: string;

    @Column({ length: 255, nullable: true })
    product: string;

    @Column({ length: 255, nullable: true })
    company?: string;

    @Column({ length: 100, nullable: true })
    country?: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @Column('simple-array', { nullable: true })
    attachments?: string[];

    @Column({ type: 'json', nullable: true })
    extra?: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;
}
