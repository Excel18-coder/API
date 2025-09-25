import { ConsultType } from '../entities/consultation.entity';
export declare class CreateConsultationDto {
    full_name: string;
    phone: string;
    consult_type: ConsultType;
    date: string;
    time: string;
    message?: string;
    serviceType?: string;
    status?: string;
}
