import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation, ConsultationStatus } from './entities/consultation.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class ConsultationsController {
    private readonly consultationsService;
    constructor(consultationsService: ConsultationsService);
    create(createConsultationDto: CreateConsultationDto): Promise<ApiResponse<Consultation>>;
    findAll(): Promise<ApiResponse<Consultation[]>>;
    testConnection(): Promise<ApiResponse<{
        message: string;
        count: number;
    }>>;
    findOne(id: number): Promise<ApiResponse<Consultation>>;
    update(id: number, updateConsultationDto: UpdateConsultationDto): Promise<ApiResponse<Consultation>>;
    updateStatus(id: number, updatedStatus: {
        status: ConsultationStatus;
    }): Promise<ApiResponse<Consultation>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
