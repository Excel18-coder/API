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
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const consultation_entity_1 = require("./entities/consultation.entity");
let ConsultationsService = class ConsultationsService {
    consultationRepository;
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;
    }
    async create(createConsultationDto) {
        try {
            console.log('📋 Received consultation DTO:', createConsultationDto);
            try {
                const count = await this.consultationRepository.count();
                console.log('📋 Database connection test - existing consultations count:', count);
            }
            catch (dbError) {
                console.error('📋 Database connection error:', dbError);
                return {
                    success: false,
                    message: 'Database connection failed',
                    error: dbError.message,
                };
            }
            const consultationDate = new Date(createConsultationDto.date);
            const consultationTime = new Date(`${createConsultationDto.date}T${createConsultationDto.time}`);
            console.log('📋 Parsed dates:', { consultationDate, consultationTime });
            const prepared = {
                user_id: 1,
                full_name: createConsultationDto.full_name,
                phone: createConsultationDto.phone,
                consult_type: createConsultationDto.consult_type,
                date: consultationDate,
                time: consultationTime,
            };
            console.log('📋 Prepared consultation data:', prepared);
            const newConsult = this.consultationRepository.create(prepared);
            console.log('📋 Created consultation entity:', newConsult);
            const saved = await this.consultationRepository.save(newConsult);
            console.log('📋 Saved consultation:', saved);
            return {
                success: true,
                message: 'Consultation created successfully',
                data: saved,
            };
        }
        catch (error) {
            console.error('Consultation creation error:', error);
            return {
                success: false,
                message: 'Failed to create consultation',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            console.log('📋 Fetching all consultations...');
            const consultations = await this.consultationRepository.find();
            console.log('📋 Found consultations:', consultations);
            return {
                success: true,
                message: 'Consultations retrieved successfully',
                data: consultations,
            };
        }
        catch (error) {
            console.error('📋 Error fetching consultations:', error);
            return {
                success: false,
                message: 'Failed to retrieve consultations',
                error: error.message,
            };
        }
    }
    async testConnection() {
        try {
            console.log('📋 Testing database connection...');
            const count = await this.consultationRepository.count();
            console.log('📋 Database connection successful, count:', count);
            return {
                success: true,
                message: 'Database connection successful',
                data: { message: 'Connected to consultations table', count },
            };
        }
        catch (error) {
            console.error('📋 Database connection test failed:', error);
            return {
                success: false,
                message: 'Database connection failed',
                error: error.message,
            };
        }
    }
    async findOne(id) {
        try {
            const consultation = await this.consultationRepository.findOne({
                where: { id },
            });
            if (!consultation)
                throw new common_1.NotFoundException(`Consultation with id ${id} not found`);
            return {
                success: true,
                message: 'Consultation found successfully',
                data: consultation,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: `Failed to find consultation with id ${id}`,
                error: error.message,
            };
        }
    }
    async update(id, updateConsultationDto) {
        try {
            const consultation = await this.consultationRepository.findOne({
                where: { id },
            });
            if (!consultation)
                throw new common_1.NotFoundException(`Consultation with id ${id} not found`);
            const prepared = {
                full_name: updateConsultationDto.full_name ?? consultation.full_name,
                phone: updateConsultationDto.phone ?? consultation.phone,
            };
            const saved = await this.consultationRepository.save({
                ...consultation,
                ...prepared,
            });
            return {
                success: true,
                message: 'Consultation updated successfully',
                data: saved,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: `Failed to update consultation with id ${id}`,
                error: error.message,
            };
        }
    }
    async updateStatus(id, status) {
        const consultation = await this.consultationRepository.findOne({
            where: { id },
        });
        if (!consultation)
            throw new common_1.NotFoundException(`Consultation with id ${id} not found`);
        const updatedStatus = await this.consultationRepository.save({
            ...consultation,
            status
        });
        return {
            success: true,
            message: 'Consultation updated successfully',
            data: updatedStatus,
        };
    }
    async remove(id) {
        try {
            const consultation = await this.consultationRepository.findOne({
                where: { id },
            });
            if (!consultation)
                throw new common_1.NotFoundException(`Consultation with id ${id} not found`);
            await this.consultationRepository.remove(consultation);
            return {
                success: true,
                message: 'Consultation deleted successfully',
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: `Failed to delete consultation with id ${id}`,
                error: error.message,
            };
        }
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map