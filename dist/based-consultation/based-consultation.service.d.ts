import { CreateBasedConsultationDto } from './dto/create-based-consultation.dto';
import { UpdateBasedConsultationDto } from './dto/update-based-consultation.dto';
import { BasedConsultation } from './entities/based-consultation.entity';
import { Repository } from 'typeorm';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class BasedConsultationService {
    private readonly basedConsultationRepository;
    constructor(basedConsultationRepository: Repository<BasedConsultation>);
    create(createBasedConsultationDto: CreateBasedConsultationDto): Promise<ApiResponse<BasedConsultation>>;
    findAll(): Promise<ApiResponse<BasedConsultation[]>>;
    findOne(id: number): Promise<ApiResponse<BasedConsultation>>;
    update(id: number, updateBasedConsultationDto: UpdateBasedConsultationDto): Promise<ApiResponse<BasedConsultation>>;
    remove(id: number): Promise<ApiResponse<null>>;
    updateStatus(id: number, status: string): Promise<ApiResponse<BasedConsultation>>;
}
export {};
