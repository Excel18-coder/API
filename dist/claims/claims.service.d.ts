import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim, claimStatus } from './entities/claim.entity';
import { Repository } from 'typeorm';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class ClaimsService {
    private readonly claimRepository;
    constructor(claimRepository: Repository<Claim>);
    createClaim(createClaimDto: CreateClaimDto): Promise<ApiResponse<Claim>>;
    findAll(): Promise<ApiResponse<Claim[]>>;
    getClaimById(id: number): Promise<ApiResponse<Claim>>;
    updateClaim(id: number, updateClaimDto: UpdateClaimDto): Promise<ApiResponse<Claim>>;
    updateClaimStatus(id: number, updateClaimDto: {
        status: claimStatus;
    }): Promise<ApiResponse<Claim>>;
    deleteClaim(id: number): Promise<ApiResponse<null>>;
}
export {};
