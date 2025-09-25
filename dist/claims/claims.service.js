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
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const claim_entity_1 = require("./entities/claim.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ClaimsService = class ClaimsService {
    claimRepository;
    constructor(claimRepository) {
        this.claimRepository = claimRepository;
    }
    async createClaim(createClaimDto) {
        try {
            const preparedClaim = {
                ...createClaimDto,
                supporting_documents: JSON.stringify(createClaimDto.supporting_documents),
                incident_date: new Date(createClaimDto.incident_date),
                phone: String(createClaimDto.phone),
            };
            const newClaim = this.claimRepository.create(preparedClaim);
            const savedClaim = await this.claimRepository.save(newClaim);
            return {
                success: true,
                message: 'Claim created successfully',
                data: savedClaim,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create claim',
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating claim',
            };
        }
    }
    async findAll() {
        try {
            const claims = await this.claimRepository.find({
                order: { created_at: 'DESC' },
            });
            return {
                success: true,
                message: 'Claims retrieved successfully',
                data: claims.map((claim) => ({ ...claim, supporting_documents: JSON.parse(claim.supporting_documents) })),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve claims',
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while fetching claim',
            };
        }
    }
    async getClaimById(id) {
        try {
            const claim = await this.claimRepository.findOne({ where: { Id: id } });
            console.log('Found claim:', claim);
            if (!claim) {
                throw new common_1.NotFoundException(`Claim with id ${id} not found`);
            }
            return {
                success: true,
                message: 'Claim found successfully',
                data: { ...claim, supporting_documents: JSON.parse(claim.supporting_documents) }
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to find claim with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating claim',
            };
        }
    }
    async updateClaim(id, updateClaimDto) {
        try {
            const claim = await this.claimRepository.findOne({ where: { Id: id } });
            if (!claim) {
                throw new common_1.NotFoundException(`Claim with id ${id} not found`);
            }
            const preparedUpdate = {
                ...updateClaimDto,
            };
            if (updateClaimDto.incident_date) {
                preparedUpdate.incident_date = new Date(updateClaimDto.incident_date);
            }
            if (updateClaimDto.phone !== undefined) {
                preparedUpdate.phone = String(updateClaimDto.phone);
            }
            const updatedClaim = await this.claimRepository.save({
                ...claim,
                ...preparedUpdate,
            });
            return {
                success: true,
                message: 'Claim updated successfully',
                data: updatedClaim,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update claim with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating claim',
            };
        }
    }
    async updateClaimStatus(id, updateClaimDto) {
        try {
            const claim = await this.claimRepository.findOne({ where: { Id: id } });
            if (!claim) {
                throw new common_1.NotFoundException(`Claim with id ${id} not found`);
            }
            const updatedClaim = await this.claimRepository.save({
                ...claim,
                status: updateClaimDto.status,
            });
            return {
                success: true,
                message: 'Claim status updated successfully',
                data: updatedClaim,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update claim status with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating claim',
            };
        }
    }
    async deleteClaim(id) {
        try {
            const claim = await this.claimRepository.findOne({ where: { Id: id } });
            if (!claim) {
                throw new common_1.NotFoundException(`Claim with id ${id} not found`);
            }
            await this.claimRepository.remove(claim);
            return {
                success: true,
                message: 'Claim deleted successfully',
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to delete claim with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating claim',
            };
        }
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClaimsService);
//# sourceMappingURL=claims.service.js.map