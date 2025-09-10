import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsObject, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuoteDto {
    // Basic Info and Contact
    @IsString()
    @IsOptional()
    customerName?: string;

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsOptional()
    employerName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    tel?: string;

    @IsString()
    @IsOptional()
    mobileNo?: string;

    // Address Information
    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    businessAddress?: string;

    @IsString()
    @IsOptional()
    postalAddress?: string;

    @IsString()
    @IsOptional()
    poBox?: string;

    @IsString()
    @IsOptional()
    postalCode?: string;

    @IsString()
    @IsOptional()
    town?: string;

    @IsString()
    @IsOptional()
    code?: string;

    // Business Information
    @IsString()
    @IsOptional()
    businessNature?: string;

    @IsString()
    @IsOptional()
    businessOccupation?: string;

    @IsString()
    @IsOptional()
    medicalSchool?: string;

    @IsString()
    @IsOptional()
    otherMedicalSchools?: string;

    @IsString()
    @IsOptional()
    yearGraduation?: string;

    @IsString()
    @IsOptional()
    practiceTitle?: string;

    @IsString()
    @IsOptional()
    vatReg?: string;

    @IsString()
    @IsOptional()
    issuedBy?: string;

    @IsString()
    @IsOptional()
    fax?: string;

    @IsString()
    @IsOptional()
    pin?: string;

    @IsString()
    @IsOptional()
    pinNumber?: string;

    @IsString()
    @IsOptional()
    principalOffice?: string;

    @IsString()
    @IsOptional()
    subsidiaryOffice?: string;

    // Dates
    @IsDateString()
    @IsOptional()
    date?: string;

    @IsDateString()
    @IsOptional()
    periodFrom?: string;

    @IsDateString()
    @IsOptional()
    periodTo?: string;

    @IsDateString()
    @IsOptional()
    policyFrom?: string;

    @IsDateString()
    @IsOptional()
    policyTo?: string;

    @IsDateString()
    @IsOptional()
    dateCommencementCurrent?: string;

    @IsDateString()
    @IsOptional()
    dateCommencementInitial?: string;

    // Vehicle Information
    @IsString()
    @IsOptional()
    registrationMarks?: string;

    @IsString()
    @IsOptional()
    makeOfVehicle?: string;

    @IsString()
    @IsOptional()
    chassisNumber?: string;

    @IsString()
    @IsOptional()
    engineNumber?: string;

    @IsString()
    @IsOptional()
    typeOfBody?: string;

    @IsString()
    @IsOptional()
    cubicCapacity?: string;

    @IsString()
    @IsOptional()
    seatingCapacity?: string;

    // Staff and Financial Information
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseInt(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    employeeCount?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseInt(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    staffTotal?: number;

    @IsString()
    @IsOptional()
    staffBreakdown?: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseFloat(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    sumInsured?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseFloat(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    sumInsuredPerEmployee?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseFloat(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    totalSumInsured?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseFloat(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsOptional()
    feeIncomeEstimate?: number;

    // Lists and Details
    @IsString()
    @IsOptional()
    employeeList?: string;

    @IsString()
    @IsOptional()
    authorizedDrivers?: string;

    @IsString()
    @IsOptional()
    annualCarryings?: string;

    @IsString()
    @IsOptional()
    securityDetails?: string;

    @IsString()
    @IsOptional()
    disciplines?: string;

    @IsString()
    @IsOptional()
    principals?: string;

    // Claims and Insurance Information
    @IsString()
    @IsOptional()
    claimDetails?: string;

    @IsString()
    @IsOptional()
    claimsDetails?: string; // Alternative spelling that might be used

    @IsString()
    @IsOptional()
    lossDetails?: string;

    @IsString()
    @IsOptional()
    territorialLimits?: string;

    @IsString()
    @IsOptional()
    otherPoliciesDetails?: string;

    @IsString()
    @IsOptional()
    circumstancesDetails?: string;

    @IsString()
    @IsOptional()
    pastInsuranceDetails?: string;

    @IsString()
    @IsOptional()
    retiredPrincipalDetails?: string;

    @IsString()
    @IsOptional()
    declinedTermsDetails?: string;

    // Percentages and Business Details
    @IsString()
    @IsOptional()
    briefsPercentage?: string;

    @IsString()
    @IsOptional()
    workLocationPercentage?: string;

    @IsString()
    @IsOptional()
    indemnityLimits?: string;

    @IsString()
    @IsOptional()
    feeIncomeHistory?: string;

    @IsString()
    @IsOptional()
    extensionLimits?: string;

    // Declaration and Payment
    @IsString()
    @IsOptional()
    signature?: string;

    @IsString()
    @IsOptional()
    declarationName?: string;

    @IsString()
    @IsOptional()
    idNo?: string;

    @IsString()
    @IsOptional()
    modeOfPayment?: string;

    // Required Field
    @IsString()
    @IsNotEmpty()
    productType: string;

    // Additional Data
    @IsArray()
    @IsOptional()
    attachments?: string[];

    @IsObject()
    @IsOptional()
    extra?: Record<string, any>;
}
