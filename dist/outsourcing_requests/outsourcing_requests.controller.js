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
exports.OutsourcingRequestsController = void 0;
const common_1 = require("@nestjs/common");
const outsourcing_requests_service_1 = require("./outsourcing_requests.service");
const create_outsourcing_request_dto_1 = require("./dto/create-outsourcing_request.dto");
const update_outsourcing_request_dto_1 = require("./dto/update-outsourcing_request.dto");
let OutsourcingRequestsController = class OutsourcingRequestsController {
    outsourcingRequestsService;
    constructor(outsourcingRequestsService) {
        this.outsourcingRequestsService = outsourcingRequestsService;
    }
    create(createOutsourcingRequestDto) {
        return this.outsourcingRequestsService.create(createOutsourcingRequestDto);
    }
    findAll() {
        return this.outsourcingRequestsService.findAll();
    }
    findOne(id) {
        return this.outsourcingRequestsService.findOne(id);
    }
    update(id, updateOutsourcingRequestDto) {
        return this.outsourcingRequestsService.update(id, updateOutsourcingRequestDto);
    }
    updateStatus(id, updateStatus) {
        return this.outsourcingRequestsService.updateStatus(id, updateStatus.status);
    }
    remove(id) {
        return this.outsourcingRequestsService.remove(id);
    }
};
exports.OutsourcingRequestsController = OutsourcingRequestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_outsourcing_request_dto_1.CreateOutsourcingRequestDto]),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_outsourcing_request_dto_1.UpdateOutsourcingRequestDto]),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OutsourcingRequestsController.prototype, "remove", null);
exports.OutsourcingRequestsController = OutsourcingRequestsController = __decorate([
    (0, common_1.Controller)('outsourcing-requests'),
    __metadata("design:paramtypes", [outsourcing_requests_service_1.OutsourcingRequestsService])
], OutsourcingRequestsController);
//# sourceMappingURL=outsourcing_requests.controller.js.map