import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    product: string; // insurance product title

    @IsString()
    @IsOptional()
    company?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    message?: string;

    @IsArray()
    @IsOptional()
    attachments?: string[];

    @IsObject()
    @IsOptional()
    extra?: Record<string, any>; // dynamic fields for each form
}
