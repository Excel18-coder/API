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
exports.Consultation = exports.ConsultType = exports.ConsultationStatus = void 0;
const typeorm_1 = require("typeorm");
var ConsultationStatus;
(function (ConsultationStatus) {
    ConsultationStatus["PENDING"] = "pending";
    ConsultationStatus["CONFIRMED"] = "confirmed";
    ConsultationStatus["COMPLETED"] = "completed";
    ConsultationStatus["CANCELLED"] = "cancelled";
    ConsultationStatus["CONTACTED"] = "contacted";
    ConsultationStatus["SCHEDULED"] = "scheduled";
})(ConsultationStatus || (exports.ConsultationStatus = ConsultationStatus = {}));
var ConsultType;
(function (ConsultType) {
    ConsultType["ONLINE"] = "Online";
    ConsultType["PHYSICAL"] = "Physical";
})(ConsultType || (exports.ConsultType = ConsultType = {}));
let Consultation = class Consultation {
    id;
    user_id;
    full_name;
    phone;
    time;
    consult_type;
    date;
    service_type;
    country;
    status;
    created_at;
    updated_at;
};
exports.Consultation = Consultation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Consultation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Consultation.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Consultation.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Consultation.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ConsultType }),
    __metadata("design:type", String)
], Consultation.prototype, "consult_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, default: 'General' }),
    __metadata("design:type", String)
], Consultation.prototype, "service_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Consultation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ConsultationStatus,
        default: ConsultationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Consultation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "updated_at", void 0);
exports.Consultation = Consultation = __decorate([
    (0, typeorm_1.Entity)('consultations')
], Consultation);
//# sourceMappingURL=consultation.entity.js.map