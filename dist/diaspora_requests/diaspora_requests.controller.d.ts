import { DiasporaRequestsService } from './diaspora_requests.service';
import { CreateDiasporaRequestDto } from './dto/create-diaspora_request.dto';
import { UpdateDiasporaRequestDto } from './dto/update-diaspora_request.dto';
import { DiasporaRequest } from './entities/diaspora_request.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class DiasporaRequestsController {
    private readonly diasporaRequestsService;
    constructor(diasporaRequestsService: DiasporaRequestsService);
    create(createDiasporaRequestDto: CreateDiasporaRequestDto): Promise<ApiResponse<DiasporaRequest>>;
    findAll(): Promise<ApiResponse<DiasporaRequest[]>>;
    findOne(id: number): Promise<ApiResponse<DiasporaRequest>>;
    update(id: number, updateDiasporaRequestDto: UpdateDiasporaRequestDto): Promise<ApiResponse<DiasporaRequest>>;
    updateStatus(id: number, updateStatus: {
        status: string;
    }): Promise<ApiResponse<DiasporaRequest>>;
    remove(id: number): Promise<ApiResponse<null>>;
}
export {};
