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
exports.BasedConsultationController = void 0;
const common_1 = require("@nestjs/common");
const based_consultation_service_1 = require("./based-consultation.service");
const create_based_consultation_dto_1 = require("./dto/create-based-consultation.dto");
const update_based_consultation_dto_1 = require("./dto/update-based-consultation.dto");
let BasedConsultationController = class BasedConsultationController {
    basedConsultationService;
    constructor(basedConsultationService) {
        this.basedConsultationService = basedConsultationService;
    }
    async create(createBasedConsultationDto) {
        const result = await this.basedConsultationService.create(createBasedConsultationDto);
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
    async findAll() {
        const result = await this.basedConsultationService.findAll();
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
    async findOne(id) {
        const result = await this.basedConsultationService.findOne(+id);
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
    async update(id, updateBasedConsultationDto) {
        const result = await this.basedConsultationService.update(+id, updateBasedConsultationDto);
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
    async remove(id) {
        const result = await this.basedConsultationService.remove(+id);
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
    async updateStatus(id, body) {
        const result = await this.basedConsultationService.updateStatus(+id, body.status);
        if (!result.success) {
            throw new common_1.HttpException({
                message: result.message,
                error: result.error,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            message: result.message,
            data: result.data,
        };
    }
};
exports.BasedConsultationController = BasedConsultationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_based_consultation_dto_1.CreateBasedConsultationDto]),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_based_consultation_dto_1.UpdateBasedConsultationDto]),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BasedConsultationController.prototype, "updateStatus", null);
exports.BasedConsultationController = BasedConsultationController = __decorate([
    (0, common_1.Controller)('based-consultation'),
    __metadata("design:paramtypes", [based_consultation_service_1.BasedConsultationService])
], BasedConsultationController);
//# sourceMappingURL=based-consultation.controller.js.map