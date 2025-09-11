import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    // Personal Information
    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255 })
    lastName: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 50 })
    phone: string;

    @Column({ length: 255 })
    location: string;

    // Product Information
    @Column({ length: 255 })
    product: string;

    @Column({ length: 255 })
    selectedProduct: string;

    // Vehicle Information
    @Column({ length: 100 })
    vehicleType: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    vehicleValue: number;

    @Column({ length: 100 })
    registrationNumber: string;

    @Column({ length: 50 })
    engineCapacity: string;

    // Quote Details
    @Column({ length: 100 })
    budget: string;

    @Column({ length: 100 })
    coverage: string;

    @Column({ type: 'text', nullable: true })
    details: string;

    // Contact Preferences
    @Column({ length: 100 })
    contactMethod: string;

    @Column({ length: 100 })
    bestTime: string;

    // Document and Agreement
    @Column({ type: 'json', nullable: true })
    document: Record<string, any>;

    @Column({ type: 'boolean', default: false })
    terms: boolean;

    // Status and Timestamps
    @Column({ length: 20, default: 'SUBMITTED' })
    status: string;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
