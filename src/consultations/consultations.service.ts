import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ApiResponse<Consultation>> {
    try {
      const prepared: Partial<Consultation> = {
        ...createConsultationDto,
        scheduled_at: new Date(createConsultationDto.scheduled_at as unknown as string),
      };
      const newConsult = this.consultationRepository.create(prepared);
      const saved = await this.consultationRepository.save(newConsult);
      return {
        success: true,
        message: 'Consultation created successfully',
        data: saved,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create consultation',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<ApiResponse<Consultation[]>> {
    try {
      const consultations = await this.consultationRepository.find({
        order: { created_at: 'DESC' },
      });
      return {
        success: true,
        message: 'Consultations retrieved successfully',
        data: consultations,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve consultations',
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Consultation>> {
    try {
      const consultation = await this.consultationRepository.findOne({
        where: { id },
      });
      if (!consultation)
        throw new NotFoundException(`Consultation with id ${id} not found`);
      return {
        success: true,
        message: 'Consultation found successfully',
        data: consultation,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return {
        success: false,
        message: `Failed to find consultation with id ${id}`,
        error: error.message,
      };
    }
  }

  async update(
    id: number,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<ApiResponse<Consultation>> {
    try {
      const consultation = await this.consultationRepository.findOne({
        where: { id },
      });
      if (!consultation)
        throw new NotFoundException(`Consultation with id ${id} not found`);

      const { scheduled_at, ...rest } = updateConsultationDto as {
        scheduled_at?: string;
        [key: string]: unknown;
      };
      const prepared: Partial<Consultation> = { ...(rest as Partial<Consultation>) };
      if (scheduled_at) {
        prepared.scheduled_at = new Date(scheduled_at as unknown as string);
      }

      const saved = await this.consultationRepository.save({
        ...consultation,
        ...prepared,
      });
      return {
        success: true,
        message: 'Consultation updated successfully',
        data: saved,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return {
        success: false,
        message: `Failed to update consultation with id ${id}`,
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const consultation = await this.consultationRepository.findOne({
        where: { id },
      });
      if (!consultation)
        throw new NotFoundException(`Consultation with id ${id} not found`);
      await this.consultationRepository.remove(consultation);
      return {
        success: true,
        message: 'Consultation deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return {
        success: false,
        message: `Failed to delete consultation with id ${id}`,
        error: error.message,
      };
    }
  }
}
