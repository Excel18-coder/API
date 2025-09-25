import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<ApiResponse<Payment>>;
    findAll(): Promise<ApiResponse<Payment[]>>;
    verifyCallback(reference?: string, trxref?: string, ref?: string, provider?: string): Promise<ApiResponse<{
        reference: string;
        provider?: string;
    }>>;
    findOne(id: number): Promise<ApiResponse<Payment>>;
    update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<ApiResponse<Payment>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
