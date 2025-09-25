import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class QuotesService {
    private readonly quoteRepository;
    constructor(quoteRepository: Repository<Quote>);
    private generateReference;
    private processDateField;
    private processNumberField;
    create(createQuoteDto: CreateQuoteDto): Promise<ApiResponse<Quote>>;
    findAll(): Promise<ApiResponse<(Omit<Quote, "documents"> & {
        documents: any[];
    })[]>>;
    findOne(id: number): Promise<ApiResponse<Quote>>;
    update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<ApiResponse<Quote>>;
    updateStatus(id: number, status: string): Promise<{
        success: boolean;
        message: string;
        data: {
            status: string;
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            location: string;
            product: string;
            selectedProduct: string;
            constructionType?: string;
            occupancy?: string;
            budget: string;
            coverage: string;
            details?: string;
            contactMethod: string;
            bestTime: string;
            documents: string;
            terms: boolean;
            timestamp?: Date;
            created_at: Date;
            updated_at: Date;
        } & Quote;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    remove(id: number): Promise<ApiResponse<void>>;
    findByStatus(status: string): Promise<ApiResponse<Quote[]>>;
    findByProduct(product: string): Promise<ApiResponse<Quote[]>>;
}
export {};
