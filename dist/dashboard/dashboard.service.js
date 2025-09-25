"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const claim_entity_1 = require("../claims/entities/claim.entity");
const consultation_entity_1 = require("../consultations/entities/consultation.entity");
const outsourcing_request_entity_1 = require("../outsourcing_requests/entities/outsourcing_request.entity");
let DashboardService = class DashboardService {
    userRepository;
    claimRepository;
    consultationRepository;
    outsourcingRequestRepository;
    constructor(userRepository, claimRepository, consultationRepository, outsourcingRequestRepository) {
        this.userRepository = userRepository;
        this.claimRepository = claimRepository;
        this.consultationRepository = consultationRepository;
        this.outsourcingRequestRepository = outsourcingRequestRepository;
    }
    async getComprehensiveDashboard() {
        console.log('📊 Generating comprehensive dashboard data...');
        try {
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            const [totalUsers, totalClaims, totalConsultations, totalOutsourcingRequests, currentMonthUsers, lastMonthUsers, currentMonthClaims, lastMonthClaims,] = await Promise.all([
                this.userRepository.count(),
                this.claimRepository.count(),
                this.consultationRepository.count(),
                this.outsourcingRequestRepository.count(),
                this.userRepository
                    .createQueryBuilder('user')
                    .where('user.created_at >= :start', { start: currentMonthStart })
                    .getCount(),
                this.userRepository
                    .createQueryBuilder('user')
                    .where('user.created_at >= :start', { start: lastMonthStart })
                    .andWhere('user.created_at <= :end', { end: lastMonthEnd })
                    .getCount(),
                this.claimRepository
                    .createQueryBuilder('claim')
                    .where('claim.created_at >= :start', { start: currentMonthStart })
                    .getCount(),
                this.claimRepository
                    .createQueryBuilder('claim')
                    .where('claim.created_at >= :start', { start: lastMonthStart })
                    .andWhere('claim.created_at <= :end', { end: lastMonthEnd })
                    .getCount(),
            ]);
            const userGrowthRate = this.calculateGrowthRate(currentMonthUsers, lastMonthUsers);
            const claimsGrowthRate = this.calculateGrowthRate(currentMonthClaims, lastMonthClaims);
            const totalPayments = 0;
            const totalQuotes = 0;
            const totalDiasporaRequests = 0;
            const totalRevenue = 0;
            const monthlyRevenue = 0;
            const conversionRate = totalUsers > 0 ? (totalClaims / totalUsers) * 100 : 0;
            const quoteGrowthRate = 0;
            const revenueGrowthRate = 0;
            const dashboardStats = {
                totalUsers,
                totalClaims,
                totalConsultations,
                totalPayments,
                totalQuotes,
                totalOutsourcingRequests,
                totalDiasporaRequests,
                totalRevenue,
                monthlyRevenue,
                conversionRate: Number(conversionRate.toFixed(2)),
                userGrowthRate: Number(userGrowthRate.toFixed(2)),
                claimsGrowthRate: Number(claimsGrowthRate.toFixed(2)),
                quoteGrowthRate,
                revenueGrowthRate,
                lastUpdated: now.toISOString(),
            };
            console.log('✅ Dashboard data generated successfully');
            return { success: true, data: dashboardStats };
        }
        catch (error) {
            console.error('❌ Error generating dashboard data:', error);
            throw new Error('Failed to generate dashboard statistics');
        }
    }
    calculateGrowthRate(current, previous) {
        if (previous === 0) {
            return current > 0 ? 100 : 0;
        }
        return ((current - previous) / previous) * 100;
    }
    async getUserStatsByDateRange(startDate, endDate) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.createdAt >= :start', { start: startDate })
            .andWhere('user.createdAt <= :end', { end: endDate })
            .getCount();
    }
    async getClaimsStatsByStatus() {
        return await this.claimRepository
            .createQueryBuilder('claim')
            .select('claim.status, COUNT(*) as count')
            .groupBy('claim.status')
            .getRawMany();
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __param(2, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __param(3, (0, typeorm_1.InjectRepository)(outsourcing_request_entity_1.OutsourcingRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map