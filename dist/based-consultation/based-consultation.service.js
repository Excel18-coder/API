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
exports.BasedConsultationService = void 0;
const common_1 = require("@nestjs/common");
const based_consultation_entity_1 = require("./entities/based-consultation.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BasedConsultationService = class BasedConsultationService {
    basedConsultationRepository;
    constructor(basedConsultationRepository) {
        this.basedConsultationRepository = basedConsultationRepository;
    }
    async create(createBasedConsultationDto) {
        try {
            const preparedConsultation = {
                ...createBasedConsultationDto,
            };
            const newConsultation = this.basedConsultationRepository.create(preparedConsultation);
            const savedConsultation = await this.basedConsultationRepository.save(newConsultation);
            return {
                success: true,
                message: 'Based consultation created successfully',
                data: savedConsultation,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create based consultation',
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while creating based consultation',
            };
        }
    }
    async findAll() {
        try {
            const consultations = await this.basedConsultationRepository.find({});
            const processedConsultations = consultations.map((consultation) => ({
                ...consultation,
            }));
            return {
                success: true,
                message: 'Based consultations retrieved successfully',
                data: processedConsultations,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve based consultations',
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while fetching based consultations',
            };
        }
    }
    async findOne(id) {
        try {
            const consultation = await this.basedConsultationRepository.findOne({
                where: { id }
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`Based consultation with id ${id} not found`);
            }
            const processedConsultation = {
                ...consultation,
            };
            return {
                success: true,
                message: 'Based consultation found successfully',
                data: processedConsultation,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to find based consultation with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while finding based consultation',
            };
        }
    }
    async update(id, updateBasedConsultationDto) {
        try {
            const consultation = await this.basedConsultationRepository.findOne({
                where: { id }
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`Based consultation with id ${id} not found`);
            }
            const preparedUpdate = {
                ...updateBasedConsultationDto,
            };
            const updatedConsultation = await this.basedConsultationRepository.save({
                ...consultation,
                ...preparedUpdate,
            });
            return {
                success: true,
                message: 'Based consultation updated successfully',
                data: updatedConsultation,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update based consultation with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while updating based consultation',
            };
        }
    }
    async remove(id) {
        try {
            const consultation = await this.basedConsultationRepository.findOne({
                where: { id }
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`Based consultation with id ${id} not found`);
            }
            await this.basedConsultationRepository.remove(consultation);
            return {
                success: true,
                message: 'Based consultation deleted successfully',
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to delete based consultation with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while deleting based consultation',
            };
        }
    }
    async updateStatus(id, status) {
        try {
            const consultation = await this.basedConsultationRepository.findOne({
                where: { id }
            });
            if (!consultation) {
                throw new common_1.NotFoundException(`Based consultation with id ${id} not found`);
            }
            const updatedConsultation = await this.basedConsultationRepository.save({
                ...consultation,
                status,
            });
            return {
                success: true,
                message: 'Based consultation status updated successfully',
                data: updatedConsultation,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update based consultation status with id ${id}`,
                error: error instanceof Error
                    ? error.message
                    : 'An error occurred while updating status',
            };
        }
    }
};
exports.BasedConsultationService = BasedConsultationService;
exports.BasedConsultationService = BasedConsultationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(based_consultation_entity_1.BasedConsultation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BasedConsultationService);
//# sourceMappingURL=based-consultation.service.js.map