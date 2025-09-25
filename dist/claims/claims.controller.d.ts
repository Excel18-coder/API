import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim, claimStatus } from './entities/claim.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export declare class ClaimsController {
    private readonly claimsService;
    private readonly cloudinaryService;
    constructor(claimsService: ClaimsService, cloudinaryService: CloudinaryService);
    create(createClaimDto: CreateClaimDto, files: Express.Multer.File[]): Promise<any>;
    findAll(): Promise<ApiResponse<Claim[]>>;
    getClaimById(id: number): Promise<ApiResponse<Claim>>;
    updateClaim(id: number, updateClaimDto: UpdateClaimDto): Promise<ApiResponse<Claim>>;
    updateClaimStatus(id: number, updateClaimDto: {
        status: claimStatus;
    }): Promise<ApiResponse<Claim>>;
    deleteClaim(id: number): Promise<ApiResponse>;
}
export {};
