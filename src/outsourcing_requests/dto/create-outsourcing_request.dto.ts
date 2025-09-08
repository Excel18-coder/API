import { IsNumber, IsNotEmpty, IsString, IsEmail, IsOptional, IsObject } from 'class-validator';

export class CreateOutsourcingRequestDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  organization_name: string;

  @IsString()
  @IsNotEmpty()
  core_functions: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsOptional()
  services?: Record<string, unknown>;

  @IsString()
  @IsNotEmpty()
  nature_of_outsourcing: string;

  @IsString()
  @IsNotEmpty()
  budget_range: string;

  @IsString()
  @IsOptional()
  status?: string;
}
