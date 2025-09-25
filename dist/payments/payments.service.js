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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentsService = class PaymentsService {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async create(createPaymentDto) {
        try {
            const newPayment = this.paymentRepository.create(createPaymentDto);
            const saved = await this.paymentRepository.save(newPayment);
            return { success: true, message: 'Payment created successfully', data: saved };
        }
        catch (error) {
            return { success: false, message: 'Failed to create payment', error: error.message };
        }
    }
    async findAll() {
        try {
            const items = await this.paymentRepository.find({ order: { created_at: 'DESC' } });
            return { success: true, message: 'Payments retrieved successfully', data: items };
        }
        catch (error) {
            return { success: false, message: 'Failed to retrieve payments', error: error.message };
        }
    }
    async findOne(id) {
        try {
            const item = await this.paymentRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Payment with id ${id} not found`);
            return { success: true, message: 'Payment found successfully', data: item };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to find payment with id ${id}`, error: error.message };
        }
    }
    async update(id, updatePaymentDto) {
        try {
            const item = await this.paymentRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Payment with id ${id} not found`);
            const saved = await this.paymentRepository.save({ ...item, ...updatePaymentDto });
            return { success: true, message: 'Payment updated successfully', data: saved };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to update payment with id ${id}`, error: error.message };
        }
    }
    async remove(id) {
        try {
            const item = await this.paymentRepository.findOne({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException(`Payment with id ${id} not found`);
            await this.paymentRepository.remove(item);
            return { success: true, message: 'Payment deleted successfully', data: null };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return { success: false, message: `Failed to delete payment with id ${id}`, error: error.message };
        }
    }
    async verifyByReference(reference, provider) {
        try {
            return {
                success: true,
                message: 'Verification callback received',
                data: { reference, provider },
            };
        }
        catch (error) {
            return { success: false, message: 'Verification failed', error: error.message };
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map