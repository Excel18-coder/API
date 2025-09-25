import { paymentStatus } from '../entities/payment.entity';
export declare class CreatePaymentDto {
    user_id: number;
    amount: number;
    currency?: string;
    method: string;
    status?: paymentStatus;
    metadata?: Record<string, unknown>;
}
