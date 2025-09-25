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
exports.BookingConsultantsService = void 0;
const common_1 = require("@nestjs/common");
const booking_consultant_entity_1 = require("./entities/booking-consultant.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BookingConsultantsService = class BookingConsultantsService {
    bookingRepository;
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async create(createBookingConsultantDto) {
        try {
            const preparedBooking = {
                ...createBookingConsultantDto,
                preferred_date: createBookingConsultantDto.preferred_date,
                preferred_time: createBookingConsultantDto.preferred_time,
            };
            const newBooking = this.bookingRepository.create(preparedBooking);
            const savedBooking = await this.bookingRepository.save(newBooking);
            return {
                success: true,
                message: 'Booking consultation created successfully',
                data: savedBooking,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create booking consultation',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const bookings = await this.bookingRepository.find({
                order: { created_at: 'DESC' },
            });
            return {
                success: true,
                message: 'Booking consultations retrieved successfully',
                data: bookings,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve booking consultations',
                error: error.message,
            };
        }
    }
    async findOne(id) {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException(`Booking consultation with id ${id} not found`);
            }
            return {
                success: true,
                message: 'Booking consultation found',
                data: booking,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: 'Failed to retrieve booking consultation',
                error: error.message,
            };
        }
    }
    async update(id, updateBookingConsultantDto) {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException(`Booking consultation with id ${id} not found`);
            }
            const { preferred_date, preferred_time, ...rest } = updateBookingConsultantDto;
            const prepared = { ...rest };
            if (preferred_date) {
                prepared.preferred_date = preferred_date;
            }
            if (preferred_time) {
                prepared.preferred_time = preferred_time;
            }
            const updatedBooking = await this.bookingRepository.save({
                ...booking,
                ...prepared,
            });
            return {
                success: true,
                message: 'Booking consultation updated successfully',
                data: updatedBooking,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: 'Failed to update booking consultation',
                error: error.message,
            };
        }
    }
    async remove(id) {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException(`Booking consultation with id ${id} not found`);
            }
            await this.bookingRepository.remove(booking);
            return {
                success: true,
                message: 'Booking consultation deleted successfully',
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: 'Failed to delete booking consultation',
                error: error.message,
            };
        }
    }
};
exports.BookingConsultantsService = BookingConsultantsService;
exports.BookingConsultantsService = BookingConsultantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_consultant_entity_1.BookingConsultant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingConsultantsService);
//# sourceMappingURL=booking-consultants.service.js.map