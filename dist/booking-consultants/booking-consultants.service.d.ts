import { CreateBookingConsultantDto } from './dto/create-booking-consultant.dto';
import { UpdateBookingConsultantDto } from './dto/update-booking-consultant.dto';
import { BookingConsultant } from './entities/booking-consultant.entity';
import { Repository } from 'typeorm';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class BookingConsultantsService {
    private readonly bookingRepository;
    constructor(bookingRepository: Repository<BookingConsultant>);
    create(createBookingConsultantDto: CreateBookingConsultantDto): Promise<ApiResponse<BookingConsultant>>;
    findAll(): Promise<ApiResponse<BookingConsultant[]>>;
    findOne(id: number): Promise<ApiResponse<BookingConsultant>>;
    update(id: number, updateBookingConsultantDto: UpdateBookingConsultantDto): Promise<ApiResponse<BookingConsultant>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
