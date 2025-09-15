import { IsNumber, IsNotEmpty, IsString, IsEmail, IsDateString, IsIn, isEnum, IsEnum, IsArray } from 'class-validator';
import { ClaimType, Document } from '../entities/claim.entity';
export class CreateClaimDto {
  // @IsNumber()
  // @IsNotEmpty()
  // user_id: number;

  @IsNumber()
  @IsNotEmpty()
  policy_number: number;

  @IsEnum(ClaimType)
  @IsNotEmpty()
  claim_type: ClaimType;

  @IsDateString()
  @IsNotEmpty()
  incident_date: string;

  @IsNumber()
  @IsNotEmpty()
  estimated_loss: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsString()
  // @IsNotEmpty()
  // status: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  supporting_documents: any

}
