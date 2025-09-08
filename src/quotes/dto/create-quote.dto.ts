import { IsNumber, IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { quoteStatus } from '../entities/quote.entity';

export class CreateQuoteDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  @IsNumber()
  @IsNotEmpty()
  estimated_premium: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  details: string;


  @IsString()
  @IsNotEmpty()
  service_type: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(quoteStatus)
  @IsOptional()
  status?: quoteStatus;

}
