import { DashboardService } from './dashboard.service';
import { DashboardStats } from './dto/dashboard-stats.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getComprehensiveDashboard(): Promise<{
        success: boolean;
        data: DashboardStats;
    }>;
}
