import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) { }

  private generateReference(productType: string): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const prefix = productType.slice(0, 3).toUpperCase();

    return `${prefix}${year}${month}${day}${random}`;
  }

  private processDateField(value: string | Date | undefined): Date | undefined {
    if (!value) return undefined;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  }

  private processNumberField(value: string | number | undefined): number | undefined {
    if (value === undefined || value === '') return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  }

  async create(createQuoteDto: CreateQuoteDto): Promise<ApiResponse<Quote>> {
    try {
      // Generate reference number
      const reference = this.generateReference(createQuoteDto.productType);

      // Process the data
      const processedData = { ...createQuoteDto };

      // Process dates if they exist
      const dateFields: (keyof CreateQuoteDto)[] = [
        'date',
        'periodFrom',
        'periodTo',
        'policyFrom',
        'policyTo',
        'dateCommencementCurrent',
        'dateCommencementInitial'
      ];

      // Process numbers if they exist
      const numberFields: (keyof CreateQuoteDto)[] = [
        'employeeCount',
        'staffTotal',
        'sumInsured',
        'sumInsuredPerEmployee',
        'totalSumInsured',
        'feeIncomeEstimate'
      ];

      // Create the entity object with type safety
      const prepared: Record<string, any> = {
        reference,
        status: 'pending'
      };

      // Copy non-processed fields
      Object.keys(processedData).forEach(key => {
        if (!dateFields.includes(key as any) && !numberFields.includes(key as any)) {
          prepared[key] = processedData[key];
        }
      });

      // Process date fields
      dateFields.forEach(field => {
        if (field in processedData) {
          const processed = this.processDateField(processedData[field] as string);
          if (processed !== undefined) {
            prepared[field] = processed;
          }
        }
      });

      // Process number fields
      numberFields.forEach(field => {
        if (field in processedData) {
          const processed = this.processNumberField(processedData[field] as string | number);
          if (processed !== undefined) {
            prepared[field] = processed;
          }
        }
      });

      const newQuote = this.quoteRepository.create(prepared);
      const saved = await this.quoteRepository.save(newQuote);
      return {
        success: true,
        message: 'Quote created successfully',
        data: saved
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create quote',
        error: error.message
      };
    }
  }

  async findAll(): Promise<ApiResponse<Quote[]>> {
    try {
      const quotes = await this.quoteRepository.find({
        order: { created_at: 'DESC' }
      });
      return {
        success: true,
        message: 'Quotes retrieved successfully',
        data: quotes
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve quotes',
        error: error.message
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Quote>> {
    try {
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
      return {
        success: true,
        message: 'Quote found successfully',
        data: quote
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return { success: false, message: `Failed to find quote with id ${id}`, error: error.message };
    }
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<ApiResponse<Quote>> {
    try {
      // Check if quote exists
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) {
        throw new NotFoundException(`Quote with id ${id} not found`);
      }

      // Create a copy of the DTO for processing
      const processedData = { ...updateQuoteDto };

      // Process dates if they exist
      const dateFields: (keyof UpdateQuoteDto)[] = [
        'date',
        'periodFrom',
        'periodTo',
        'policyFrom',
        'policyTo',
        'dateCommencementCurrent',
        'dateCommencementInitial'
      ];

      // Process numbers if they exist
      const numberFields: (keyof UpdateQuoteDto)[] = [
        'employeeCount',
        'staffTotal',
        'sumInsured',
        'sumInsuredPerEmployee',
        'totalSumInsured',
        'feeIncomeEstimate'
      ];

      // Create the update object with type safety
      const prepared: Record<string, any> = {};

      // Copy non-processed fields
      Object.keys(processedData).forEach(key => {
        if (!dateFields.includes(key as any) && !numberFields.includes(key as any)) {
          prepared[key] = processedData[key];
        }
      });

      // Process date fields
      dateFields.forEach(field => {
        if (field in processedData) {
          const processed = this.processDateField(processedData[field] as string);
          if (processed !== undefined) {
            prepared[field] = processed;
          }
        }
      });

      // Process number fields
      numberFields.forEach(field => {
        if (field in processedData) {
          const processed = this.processNumberField(processedData[field] as string | number);
          if (processed !== undefined) {
            prepared[field] = processed;
          }
        }
      });

      // Update and return the quote
      await this.quoteRepository.update(id, prepared);
      const updated = await this.quoteRepository.findOne({ where: { id } });

      if (!updated) {
        throw new NotFoundException(`Quote with id ${id} not found after update`);
      }

      return {
        success: true,
        message: 'Quote updated successfully',
        data: updated
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Failed to update quote with id ${id}`,
        error: error.message
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) {
        throw new NotFoundException(`Quote with id ${id} not found`);
      }

      await this.quoteRepository.delete(id);
      return {
        success: true,
        message: 'Quote deleted successfully'
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Failed to delete quote with id ${id}`,
        error: error.message
      };
    }
  }
}
