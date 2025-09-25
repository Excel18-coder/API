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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOutsourcingRequestDto = void 0;
const class_validator_1 = require("class-validator");
const outsourcing_request_entity_1 = require("../entities/outsourcing_request.entity");
const outsourcing_request_entity_2 = require("../entities/outsourcing_request.entity");
class CreateOutsourcingRequestDto {
    organization_name;
    core_functions;
    location;
    address;
    email;
    services;
    nature_of_outsourcing;
    budget_range;
}
exports.CreateOutsourcingRequestDto = CreateOutsourcingRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "organization_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "core_functions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOutsourcingRequestDto.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(outsourcing_request_entity_1.NatureOfOutsourcing),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "nature_of_outsourcing", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(outsourcing_request_entity_2.BudgetRange),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutsourcingRequestDto.prototype, "budget_range", void 0);
//# sourceMappingURL=create-outsourcing_request.dto.js.map