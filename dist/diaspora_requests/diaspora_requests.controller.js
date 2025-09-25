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
exports.DiasporaRequestsController = void 0;
const common_1 = require("@nestjs/common");
const diaspora_requests_service_1 = require("./diaspora_requests.service");
const create_diaspora_request_dto_1 = require("./dto/create-diaspora_request.dto");
const update_diaspora_request_dto_1 = require("./dto/update-diaspora_request.dto");
let DiasporaRequestsController = class DiasporaRequestsController {
    diasporaRequestsService;
    constructor(diasporaRequestsService) {
        this.diasporaRequestsService = diasporaRequestsService;
    }
    create(createDiasporaRequestDto) {
        return this.diasporaRequestsService.create(createDiasporaRequestDto);
    }
    findAll() {
        return this.diasporaRequestsService.findAll();
    }
    findOne(id) {
        return this.diasporaRequestsService.findOne(id);
    }
    update(id, updateDiasporaRequestDto) {
        return this.diasporaRequestsService.update(id, updateDiasporaRequestDto);
    }
    updateStatus(id, updateStatus) {
        return this.diasporaRequestsService.updateStatus(id, updateStatus.status);
    }
    remove(id) {
        return this.diasporaRequestsService.remove(id);
    }
};
exports.DiasporaRequestsController = DiasporaRequestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diaspora_request_dto_1.CreateDiasporaRequestDto]),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_diaspora_request_dto_1.UpdateDiasporaRequestDto]),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiasporaRequestsController.prototype, "remove", null);
exports.DiasporaRequestsController = DiasporaRequestsController = __decorate([
    (0, common_1.Controller)('diaspora-requests'),
    __metadata("design:paramtypes", [diaspora_requests_service_1.DiasporaRequestsService])
], DiasporaRequestsController);
//# sourceMappingURL=diaspora_requests.controller.js.map