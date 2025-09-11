import { IsString, IsNotEmpty, IsEmail, IsOptional, IsObject, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuoteDto {
    // Personal Information
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    // Product Information
    @IsString()
    @IsNotEmpty()
    product: string;

    @IsString()
    @IsNotEmpty()
    selectedProduct: string;

    // Vehicle Information
    @IsString()
    @IsNotEmpty()
    vehicleType: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.trim() === '' ? null : parseFloat(value) || null;
        }
        return typeof value === 'number' ? value : null;
    })
    @IsNumber()
    @IsNotEmpty()
    vehicleValue: number;

    @IsString()
    @IsNotEmpty()
    registrationNumber: string;

    @IsString()
    @IsNotEmpty()
    engineCapacity: string;

    // Quote Details
    @IsString()
    @IsNotEmpty()
    budget: string;

    @IsString()
    @IsNotEmpty()
    coverage: string;

    @IsString()
    @IsOptional()
    details?: string;

    // Contact Preferences
    @IsString()
    @IsNotEmpty()
    contactMethod: string;

    @IsString()
    @IsNotEmpty()
    bestTime: string;

    // Document and Agreement
    @IsObject()
    @IsOptional()
    document?: Record<string, any>;

    @IsBoolean()
    @IsNotEmpty()
    terms: boolean;

    // Status and Timestamps
    @IsString()
    @IsOptional()
    status?: string;

    @IsDateString()
    @IsOptional()
    timestamp?: string;
}
