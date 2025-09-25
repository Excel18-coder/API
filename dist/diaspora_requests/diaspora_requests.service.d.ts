import { CreateDiasporaRequestDto } from './dto/create-diaspora_request.dto';
import { UpdateDiasporaRequestDto } from './dto/update-diaspora_request.dto';
import { Repository } from 'typeorm';
import { DiasporaRequest } from './entities/diaspora_request.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class DiasporaRequestsService {
    private readonly diasporaRepository;
    constructor(diasporaRepository: Repository<DiasporaRequest>);
    create(createDiasporaRequestDto: CreateDiasporaRequestDto): Promise<ApiResponse<DiasporaRequest>>;
    findAll(): Promise<ApiResponse<DiasporaRequest[]>>;
    findOne(id: number): Promise<ApiResponse<DiasporaRequest>>;
    update(id: number, updateDiasporaRequestDto: UpdateDiasporaRequestDto): Promise<ApiResponse<DiasporaRequest>>;
    updateStatus(id: number, status: string): Promise<ApiResponse<DiasporaRequest>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
