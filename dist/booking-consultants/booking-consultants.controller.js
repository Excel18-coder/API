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
exports.BookingConsultantsController = void 0;
const common_1 = require("@nestjs/common");
const booking_consultants_service_1 = require("./booking-consultants.service");
const create_booking_consultant_dto_1 = require("./dto/create-booking-consultant.dto");
const update_booking_consultant_dto_1 = require("./dto/update-booking-consultant.dto");
let BookingConsultantsController = class BookingConsultantsController {
    bookingConsultantsService;
    constructor(bookingConsultantsService) {
        this.bookingConsultantsService = bookingConsultantsService;
    }
    create(createBookingConsultantDto) {
        return this.bookingConsultantsService.create(createBookingConsultantDto);
    }
    findAll() {
        return this.bookingConsultantsService.findAll();
    }
    findOne(id) {
        return this.bookingConsultantsService.findOne(id);
    }
    update(id, updateBookingConsultantDto) {
        return this.bookingConsultantsService.update(id, updateBookingConsultantDto);
    }
    remove(id) {
        return this.bookingConsultantsService.remove(id);
    }
};
exports.BookingConsultantsController = BookingConsultantsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_consultant_dto_1.CreateBookingConsultantDto]),
    __metadata("design:returntype", Promise)
], BookingConsultantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingConsultantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingConsultantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_booking_consultant_dto_1.UpdateBookingConsultantDto]),
    __metadata("design:returntype", Promise)
], BookingConsultantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingConsultantsController.prototype, "remove", null);
exports.BookingConsultantsController = BookingConsultantsController = __decorate([
    (0, common_1.Controller)('booking-consultants'),
    __metadata("design:paramtypes", [booking_consultants_service_1.BookingConsultantsService])
], BookingConsultantsController);
//# sourceMappingURL=booking-consultants.controller.js.map