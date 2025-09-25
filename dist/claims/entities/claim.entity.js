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
exports.Claim = exports.ClaimType = exports.claimStatus = void 0;
const typeorm_1 = require("typeorm");
var claimStatus;
(function (claimStatus) {
    claimStatus["PENDING"] = "pending  ";
    claimStatus["APPROVED"] = "approved";
    claimStatus["REJECTED"] = "rejected";
    claimStatus["IN_REVIEW"] = "in-review";
    claimStatus["CLOSED"] = "closed";
    claimStatus["PROCCESSING"] = "processing";
})(claimStatus || (exports.claimStatus = claimStatus = {}));
var ClaimType;
(function (ClaimType) {
    ClaimType["MOTOR"] = "Motor";
    ClaimType["HEALTH"] = "Health";
    ClaimType["PROPERTY"] = "Property";
    ClaimType["TRAVEL"] = "Travel";
    ClaimType["LIFE"] = "Life";
    ClaimType["PUBLIC_LIABILITY"] = "Public liability";
    ClaimType["FIDELITY_GUARANTEE"] = "Fidelity guarantee";
    ClaimType["WORKSMEN_COMPENSATION_ACCIDENT"] = "Worksmen compensation accident";
    ClaimType["WINDSCREEN_AND_WINDOW_DAMAGE"] = "Windscreen and window damage";
    ClaimType["MOTOR_ENTERTAINMENT"] = "Motor entertainment";
    ClaimType["MOTOR_THEFT"] = "Motor theft";
})(ClaimType || (exports.ClaimType = ClaimType = {}));
let Claim = class Claim {
    Id;
    policy_number;
    claim_type;
    incident_date;
    estimated_loss;
    description;
    status;
    email;
    first_name;
    last_name;
    phone;
    created_at;
    updated_at;
    supporting_documents;
};
exports.Claim = Claim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Claim.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Claim.prototype, "policy_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ClaimType }),
    __metadata("design:type", String)
], Claim.prototype, "claim_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Claim.prototype, "incident_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Claim.prototype, "estimated_loss", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: claimStatus, default: claimStatus.PENDING }),
    __metadata("design:type", String)
], Claim.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Claim.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Claim.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
    __metadata("design:type", String)
], Claim.prototype, "supporting_documents", void 0);
exports.Claim = Claim = __decorate([
    (0, typeorm_1.Entity)('claims')
], Claim);
//# sourceMappingURL=claim.entity.js.map