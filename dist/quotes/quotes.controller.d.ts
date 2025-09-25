import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class QuotesController {
    private readonly quotesService;
    private readonly cloudinaryService;
    constructor(quotesService: QuotesService, cloudinaryService: CloudinaryService);
    create(createQuoteDto: CreateQuoteDto, files: Express.Multer.File[]): Promise<ApiResponse<Quote>>;
    findAll(): Promise<ApiResponse<(Omit<Quote, "documents"> & {
        documents: any[];
    })[]>>;
    findOne(id: number): Promise<ApiResponse<Quote>>;
    update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<ApiResponse<Quote>>;
    updateStatus(id: number, body: {
        status: string;
    }): Promise<ApiResponse<Quote>>;
    remove(id: number): Promise<ApiResponse<void>>;
}
export {};
