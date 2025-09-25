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
exports.OutsourcingRequest = exports.NatureOfOutsourcing = exports.BudgetRange = exports.OutsourcingService = void 0;
const typeorm_1 = require("typeorm");
var OutsourcingService;
(function (OutsourcingService) {
    OutsourcingService["UNDERWRITING_SUPPORT"] = "Underwriting Support";
    OutsourcingService["CLAIMS_AUDIT"] = "Claims Audit";
    OutsourcingService["CLAIMS_DATA_MANAGEMENT"] = "Claims Data Management";
    OutsourcingService["QUOTATION_SUPPORT"] = "Quotation Support";
    OutsourcingService["RENEWAL_NEGOTIATION"] = "Renewal Negotiation";
    OutsourcingService["POLICY_ADMINISTRATION"] = "Policy Administration";
})(OutsourcingService || (exports.OutsourcingService = OutsourcingService = {}));
var BudgetRange;
(function (BudgetRange) {
    BudgetRange["KES_50_100K"] = "KES 50,000 - 100,000";
    BudgetRange["KES_100_250K"] = "KES 100,000 - 250,000";
    BudgetRange["KES_250_500K"] = "KES 250,000 - 500,000";
    BudgetRange["KES_500K_1M"] = "KES 500,000 - 1,000,000";
    BudgetRange["KES_1M_PLUS"] = "KES 1,000,000+";
})(BudgetRange || (exports.BudgetRange = BudgetRange = {}));
var NatureOfOutsourcing;
(function (NatureOfOutsourcing) {
    NatureOfOutsourcing["FULL_OUTSOURCING"] = "Full outsourcing";
    NatureOfOutsourcing["PARTIAL_OUTSOURCING"] = "Partial outsourcing";
    NatureOfOutsourcing["ON_DEMAND_SUPPORT"] = "On-demand support";
})(NatureOfOutsourcing || (exports.NatureOfOutsourcing = NatureOfOutsourcing = {}));
let OutsourcingRequest = class OutsourcingRequest {
    id;
    organization_name;
    core_functions;
    location;
    address;
    email;
    services;
    nature_of_outsourcing;
    budget_range;
    status;
    created_at;
    updated_at;
};
exports.OutsourcingRequest = OutsourcingRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OutsourcingRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "organization_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "core_functions", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], OutsourcingRequest.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "nature_of_outsourcing", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "budget_range", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'pending' }),
    __metadata("design:type", String)
], OutsourcingRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OutsourcingRequest.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OutsourcingRequest.prototype, "updated_at", void 0);
exports.OutsourcingRequest = OutsourcingRequest = __decorate([
    (0, typeorm_1.Entity)('outsourcing_requests')
], OutsourcingRequest);
//# sourceMappingURL=outsourcing_request.entity.js.map