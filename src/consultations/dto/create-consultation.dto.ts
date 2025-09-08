import { IsNumber, IsNotEmpty, IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';
import { consultationStatus } from '../entities/consultation.entity';

export class CreateConsultationDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

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
  country: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsNotEmpty()
  service_interest: string;

  @IsString()
  @IsNotEmpty()
  service_type: string;

  @IsDateString()
  @IsNotEmpty()
  scheduled_at: string;

  @IsString()
  @IsOptional()
  status?: consultationStatus;

  @IsString()
  @IsOptional()
  meeting_link?: string | null;

  @IsNumber()
  @IsOptional()
  duration?: number | null;

  @IsString()
  @IsOptional()
  notes?: string | null;
}
