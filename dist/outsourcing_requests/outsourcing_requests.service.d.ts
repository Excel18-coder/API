import { CreateOutsourcingRequestDto } from './dto/create-outsourcing_request.dto';
import { UpdateOutsourcingRequestDto } from './dto/update-outsourcing_request.dto';
import { Repository } from 'typeorm';
import { OutsourcingRequest } from './entities/outsourcing_request.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class OutsourcingRequestsService {
    private readonly outsourcingRepository;
    constructor(outsourcingRepository: Repository<OutsourcingRequest>);
    create(createOutsourcingRequestDto: CreateOutsourcingRequestDto): Promise<ApiResponse<OutsourcingRequest>>;
    findAll(): Promise<ApiResponse<OutsourcingRequest[]>>;
    findOne(id: number): Promise<ApiResponse<OutsourcingRequest>>;
    update(id: number, updateOutsourcingRequestDto: UpdateOutsourcingRequestDto): Promise<ApiResponse<OutsourcingRequest>>;
    updateStatus(id: number, status: string): Promise<ApiResponse<OutsourcingRequest>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
