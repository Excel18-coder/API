import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Claim } from '../claims/entities/claim.entity';
import { Consultation } from '../consultations/entities/consultation.entity';
import { OutsourcingRequest } from '../outsourcing_requests/entities/outsourcing_request.entity';
import { DashboardStats } from './dto/dashboard-stats.dto';
export declare class DashboardService {
    private userRepository;
    private claimRepository;
    private consultationRepository;
    private outsourcingRequestRepository;
    constructor(userRepository: Repository<User>, claimRepository: Repository<Claim>, consultationRepository: Repository<Consultation>, outsourcingRequestRepository: Repository<OutsourcingRequest>);
    getComprehensiveDashboard(): Promise<{
        success: boolean;
        data: DashboardStats;
    }>;
    private calculateGrowthRate;
    getUserStatsByDateRange(startDate: Date, endDate: Date): Promise<number>;
    getClaimsStatsByStatus(): Promise<any[]>;
}
