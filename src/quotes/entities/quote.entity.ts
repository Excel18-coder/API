import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    // Basic Info and Contact
    @Column({ length: 255, nullable: true })
    customerName: string;

    @Column({ length: 255, nullable: true })
    employerName: string;

    @Column({ length: 255, nullable: true })
    email: string;

    @Column({ length: 50, nullable: true })
    tel: string;

    @Column({ length: 50, nullable: true })
    mobileNo: string;

    // Address Information
    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'text', nullable: true })
    postalAddress: string;

    @Column({ length: 50, nullable: true })
    poBox: string;

    @Column({ length: 50, nullable: true })
    postalCode: string;

    @Column({ length: 100, nullable: true })
    town: string;

    @Column({ length: 50, nullable: true })
    code: string;

    // Business Information
    @Column({ length: 255, nullable: true })
    businessNature: string;

    @Column({ length: 255, nullable: true })
    practiceTitle: string;

    @Column({ length: 50, nullable: true })
    vatReg: string;

    @Column({ length: 50, nullable: true })
    pinNumber: string;

    @Column({ length: 255, nullable: true })
    principalOffice: string;

    @Column({ length: 255, nullable: true })
    subsidiaryOffice: string;

    // Dates
    @Column({ type: 'date', nullable: true })
    date: Date;

    @Column({ type: 'date', nullable: true })
    periodFrom: Date;

    @Column({ type: 'date', nullable: true })
    periodTo: Date;

    @Column({ type: 'date', nullable: true })
    policyFrom: Date;

    @Column({ type: 'date', nullable: true })
    policyTo: Date;

    @Column({ type: 'date', nullable: true })
    dateCommencementCurrent: Date;

    @Column({ type: 'date', nullable: true })
    dateCommencementInitial: Date;

    // Vehicle Information
    @Column({ length: 100, nullable: true })
    registrationMarks: string;

    @Column({ length: 100, nullable: true })
    makeOfVehicle: string;

    @Column({ length: 100, nullable: true })
    chassisNumber: string;

    @Column({ length: 100, nullable: true })
    engineNumber: string;

    @Column({ length: 100, nullable: true })
    typeOfBody: string;

    @Column({ length: 50, nullable: true })
    cubicCapacity: string;

    @Column({ length: 50, nullable: true })
    seatingCapacity: string;

    // Staff and Financial Information
    @Column({ type: 'int', nullable: true })
    employeeCount: number;

    @Column({ type: 'int', nullable: true })
    staffTotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    sumInsured: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    sumInsuredPerEmployee: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    totalSumInsured: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    feeIncomeEstimate: number;

    // Lists and Details
    @Column({ type: 'text', nullable: true })
    employeeList: string;

    @Column({ type: 'text', nullable: true })
    authorizedDrivers: string;

    @Column({ type: 'text', nullable: true })
    disciplines: string;

    @Column({ type: 'text', nullable: true })
    principals: string;

    // Claims and Insurance Information
    @Column({ type: 'text', nullable: true })
    claimDetails: string;

    @Column({ type: 'text', nullable: true })
    otherPoliciesDetails: string;

    @Column({ type: 'text', nullable: true })
    circumstancesDetails: string;

    @Column({ type: 'text', nullable: true })
    pastInsuranceDetails: string;

    @Column({ type: 'text', nullable: true })
    retiredPrincipalDetails: string;

    @Column({ type: 'text', nullable: true })
    declinedTermsDetails: string;

    // Percentages and Business Details
    @Column({ length: 100, nullable: true })
    briefsPercentage: string;

    @Column({ length: 100, nullable: true })
    workLocationPercentage: string;

    @Column({ type: 'text', nullable: true })
    indemnityLimits: string;

    @Column({ type: 'text', nullable: true })
    feeIncomeHistory: string;

    @Column({ type: 'text', nullable: true })
    extensionLimits: string;

    // Declaration and Payment
    @Column({ length: 255, nullable: true })
    signature: string;

    @Column({ length: 255, nullable: true })
    declarationName: string;

    @Column({ length: 100, nullable: true })
    idNo: string;

    @Column({ length: 100, nullable: true })
    modeOfPayment: string;

    // Required Field
    @Column({ length: 255 })
    productType: string;

    // Additional Data
    @Column('simple-array', { nullable: true })
    attachments: string[];

    @Column({ type: 'json', nullable: true })
    extra: Record<string, any>;

    // Metadata
    @Column({ length: 50, nullable: true })
    reference: string;

    @Column({ length: 20, default: 'pending' })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
