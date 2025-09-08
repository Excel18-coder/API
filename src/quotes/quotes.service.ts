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
  ) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<ApiResponse<Quote>> {
    try {
      const prepared: Partial<Quote> = {
        ...createQuoteDto,
      };
      const newQuote = this.quoteRepository.create(prepared);
      const saved = await this.quoteRepository.save(newQuote);
      return { success: true, message: 'Quote created successfully', data: saved };
    } catch (error) {
      return { success: false, message: 'Failed to create quote', error: error.message };
    }
  }

  async findAll(): Promise<ApiResponse<Quote[]>> {
    try {
      const quotes = await this.quoteRepository.find({ order: { created_at: 'DESC' } });
      return { success: true, message: 'Quotes retrieved successfully', data: quotes };
    } catch (error) {
      return { success: false, message: 'Failed to retrieve quotes', error: error.message };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Quote>> {
    try {
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
      return { success: true, message: 'Quote found successfully', data: quote };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return { success: false, message: `Failed to find quote with id ${id}`, error: error.message };
    }
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<ApiResponse<Quote>> {
    try {
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
      const prepared: Partial<Quote> = { ...updateQuoteDto };
      const saved = await this.quoteRepository.save({ ...quote, ...prepared });
      return { success: true, message: 'Quote updated successfully', data: saved };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return { success: false, message: `Failed to update quote with id ${id}`, error: error.message };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const quote = await this.quoteRepository.findOne({ where: { id } });
      if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);
      await this.quoteRepository.remove(quote);
      return { success: true, message: 'Quote deleted successfully', data: null };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      return { success: false, message: `Failed to delete quote with id ${id}`, error: error.message };
    }
  }
}
