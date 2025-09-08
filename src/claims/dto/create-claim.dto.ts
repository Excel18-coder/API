import { IsNumber, IsNotEmpty, IsString, IsEmail, IsDateString } from 'class-validator';
export class CreateClaimDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  policy_number: number;

  @IsString()
  @IsNotEmpty()
  claim_type: string;

  @IsDateString()
  @IsNotEmpty()
  incident_date: string;

  @IsNumber()
  @IsNotEmpty()
  estimated_loss: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsEmail()
  @IsNotEmpty()
  submitter_email: string;

  @IsString()
  @IsNotEmpty()
  submitter_name: string;

  @IsString()
  @IsNotEmpty()
  submitter_phone: string;
  
}
