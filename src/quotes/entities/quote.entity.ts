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

    // // Vehicle Information - Made optional
    // @Column({ length: 100, nullable: true })
    // vehicleType?: string;

    // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    // vehicleValue?: number;

    // @Column({ length: 100, nullable: true })
    // registrationNumber?: string;

    // @Column({ length: 50, nullable: true })
    // engineCapacity?: string;

    // // Property Information - Added as optional fields
    // @Column({ length: 100, nullable: true })
    // propertyType?: string;

    // @Column({ length: 255, nullable: true })
    // propertyValue?: string;

    @Column({ length: 100, nullable: true })
    constructionType?: string;

    @Column({ length: 100, nullable: true })
    occupancy?: string;

    // Quote Details
    @Column({ length: 100 })
    budget: string;

    @Column({ length: 100 })
    coverage: string;

    @Column({ type: 'text', nullable: true })
    details?: string;

    // Contact Preferences
    @Column({ length: 100 })
    contactMethod: string;

    @Column({ length: 100 })
    bestTime: string;

    // Document and Agreement
    @Column({ type: 'json', nullable: true })
    document?: Record<string, any>;

    @Column({ type: 'boolean', default: false })
    terms: boolean;

    // Status and Timestamps
    @Column({ length: 20, default: 'SUBMITTED' })
    status?: string;

    @Column({ type: 'timestamp', nullable: true })
    timestamp?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}