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
exports.OutsourcingRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const outsourcing_request_entity_1 = require("./entities/outsourcing_request.entity");
let OutsourcingRequestsService = class OutsourcingRequestsService {
    outsourcingRepository;
    constructor(outsourcingRepository) {
        this.outsourcingRepository = outsourcingRepository;
    }
    async create(createOutsourcingRequestDto) {
        try {
            const newItem = this.outsourcingRepository.create(createOutsourcingRequestDto);
            const saved = await this.outsourcingRepository.save(newItem);
            return { success: true, message: 'Outsourcing request created successfully', data: saved };
        }
        catch (error) {
            return { success: false, message: 'Failed to create outsourcing request', error: error.message };
        }
    }
    async findAll() {
        try {
            const items = await this.outsourcingRepository.find({ order: { created_at: 'DESC' } });
            return { success: true, message: 'Outsourcing requests retrieved successfully', data: items };
        }
        catch (error) {
            return { success: false, message: 'Failed to retrieve outsourcing requests', error: error.message };
        }
    }
    async findOne(id) {
        try {
            const item = await this.outsourcingRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Outsourcing request with id ${id} not found`);
            return { success: true, message: 'Outsourcing request found successfully', data: item };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to find outsourcing request with id ${id}`, error: error.message };
        }
    }
    async update(id, updateOutsourcingRequestDto) {
        try {
            const item = await this.outsourcingRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Outsourcing request with id ${id} not found`);
            const saved = await this.outsourcingRepository.save({ ...item, ...updateOutsourcingRequestDto });
            return { success: true, message: 'Outsourcing request updated successfully', data: saved };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to update outsourcing request with id ${id}`, error: error.message };
        }
    }
    async updateStatus(id, status) {
        try {
            const item = await this.outsourcingRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Outsourcing request with id ${id} not found`);
            item.status = status;
            const saved = await this.outsourcingRepository.save(item);
            return { success: true, message: 'Outsourcing request status updated successfully', data: saved };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to update status of outsourcing request with id ${id}`, error: error.message };
        }
    }
    async remove(id) {
        try {
            const item = await this.outsourcingRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Outsourcing request with id ${id} not found`);
            await this.outsourcingRepository.remove(item);
            return { success: true, message: 'Outsourcing request deleted successfully', data: null };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to delete outsourcing request with id ${id}`, error: error.message };
        }
    }
};
exports.OutsourcingRequestsService = OutsourcingRequestsService;
exports.OutsourcingRequestsService = OutsourcingRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(outsourcing_request_entity_1.OutsourcingRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OutsourcingRequestsService);
//# sourceMappingURL=outsourcing_requests.service.js.map