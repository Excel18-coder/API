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
exports.DiasporaRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const diaspora_request_entity_1 = require("./entities/diaspora_request.entity");
let DiasporaRequestsService = class DiasporaRequestsService {
    diasporaRepository;
    constructor(diasporaRepository) {
        this.diasporaRepository = diasporaRepository;
    }
    async create(createDiasporaRequestDto) {
        try {
            const newItem = this.diasporaRepository.create(createDiasporaRequestDto);
            const saved = await this.diasporaRepository.save(newItem);
            return { success: true, message: 'Diaspora request created successfully', data: saved };
        }
        catch (error) {
            return { success: false, message: 'Failed to create diaspora request', error: error.message };
        }
    }
    async findAll() {
        try {
            const items = await this.diasporaRepository.find({ order: { created_at: 'DESC' } });
            return { success: true, message: 'Diaspora requests retrieved successfully', data: items };
        }
        catch (error) {
            return { success: false, message: 'Failed to retrieve diaspora requests', error: error.message };
        }
    }
    async findOne(id) {
        try {
            const item = await this.diasporaRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Diaspora request with id ${id} not found`);
            return { success: true, message: 'Diaspora request found successfully', data: item };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to find diaspora request with id ${id}`, error: error.message };
        }
    }
    async update(id, updateDiasporaRequestDto) {
        try {
            const item = await this.diasporaRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Diaspora request with id ${id} not found`);
            const saved = await this.diasporaRepository.save({ ...item, ...updateDiasporaRequestDto });
            return { success: true, message: 'Diaspora request updated successfully', data: saved };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to update diaspora request with id ${id}`, error: error.message };
        }
    }
    async updateStatus(id, status) {
        try {
            const item = await this.diasporaRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Diaspora request with id ${id} not found`);
            item.status = status;
            const saved = await this.diasporaRepository.save(item);
            return { success: true, message: 'Diaspora request status updated successfully', data: saved };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to update status of diaspora request with id ${id}`, error: error.message };
        }
    }
    async remove(id) {
        try {
            const item = await this.diasporaRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Diaspora request with id ${id} not found`);
            await this.diasporaRepository.remove(item);
            return { success: true, message: 'Diaspora request deleted successfully', data: null };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to delete diaspora request with id ${id}`, error: error.message };
        }
    }
};
exports.DiasporaRequestsService = DiasporaRequestsService;
exports.DiasporaRequestsService = DiasporaRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(diaspora_request_entity_1.DiasporaRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiasporaRequestsService);
//# sourceMappingURL=diaspora_requests.service.js.map