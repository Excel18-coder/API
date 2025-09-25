import { ConsultationType } from '../entities/booking-consultant.entity';
export declare class CreateBookingConsultantDto {
    full_name: string;
    email: string;
    phone: string;
    organization: string;
    consult_type: ConsultationType;
    preferred_date: string;
    preferred_time: string;
    details?: string;
}
