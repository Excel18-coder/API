import { PartialType } from '@nestjs/swagger';
import { CreateConsultationDto } from './create-consultation.dto';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @IsOptional()
  @IsNumber()
  @Min(1)
  id?: number;
}
