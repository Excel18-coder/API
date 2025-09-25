import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class PaymentsService {
    private readonly paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    create(createPaymentDto: CreatePaymentDto): Promise<ApiResponse<Payment>>;
    findAll(): Promise<ApiResponse<Payment[]>>;
    findOne(id: number): Promise<ApiResponse<Payment>>;
    update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<ApiResponse<Payment>>;
    remove(id: number): Promise<ApiResponse<null>>;
    verifyByReference(reference: string, provider?: string): Promise<ApiResponse<{
        reference: string;
        provider?: string;
    }>>;
}
export {};
