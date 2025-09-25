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
exports.QuotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quote_entity_1 = require("./entities/quote.entity");
let QuotesService = class QuotesService {
    quoteRepository;
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    generateReference(product) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0');
        const prefix = product
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 3);
        return `${prefix}${year}${month}${day}${random}`;
    }
    processDateField(value) {
        if (!value)
            return undefined;
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date;
    }
    processNumberField(value) {
        if (value === undefined || value === '')
            return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }
    async create(createQuoteDto) {
        try {
            const processedData = { ...createQuoteDto };
            const timestamp = processedData.timestamp
                ? this.processDateField(processedData.timestamp)
                : new Date();
            const prepared = {
                firstName: processedData.firstName,
                lastName: processedData.lastName,
                email: processedData.email,
                phone: processedData.phone,
                location: processedData.location,
                product: processedData.product,
                selectedProduct: processedData.selectedProduct,
                budget: processedData.budget,
                coverage: processedData.coverage,
                details: processedData.details,
                contactMethod: processedData.contactMethod,
                bestTime: processedData.bestTime,
                documents: JSON.stringify(processedData.documents),
                terms: processedData.terms,
                status: processedData.status || 'SUBMITTED',
                timestamp: timestamp || new Date(),
            };
            const newQuote = this.quoteRepository.create(prepared);
            const saved = await this.quoteRepository.save(newQuote);
            return {
                success: true,
                message: 'Quote created successfully',
                data: saved,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create quote',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const quotes = await this.quoteRepository.find();
            const processedQuotes = quotes.map((quote) => {
                let parsedDocuments = [];
                if (quote.documents) {
                    try {
                        parsedDocuments = JSON.parse(quote.documents);
                    }
                    catch (parseError) {
                        console.warn(`Failed to parse documents for quote ${quote.id}:`, parseError.message);
                        parsedDocuments = [];
                    }
                }
                return {
                    ...quote,
                    documents: parsedDocuments
                };
            });
            return {
                success: true,
                message: 'Quotes retrieved successfully',
                data: processedQuotes,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to retrieve quotes',
                error: error.message,
            };
        }
    }
    async findOne(id) {
        try {
            const quote = await this.quoteRepository.findOne({ where: { id } });
            if (!quote)
                throw new common_1.NotFoundException(`Quote with id ${id} not found`);
            return {
                success: true,
                message: 'Quote found successfully',
                data: { ...quote, documents: quote.documents ? JSON.parse(quote.documents) : [] }
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            return {
                success: false,
                message: `Failed to find quote with id ${id}`,
                error: error.message,
            };
        }
    }
    async update(id, updateQuoteDto) {
        try {
            const quote = await this.quoteRepository.findOne({ where: { id } });
            if (!quote) {
                throw new common_1.NotFoundException(`Quote with id ${id} not found`);
            }
            const processedData = { ...updateQuoteDto };
            const prepared = {};
            if (processedData.firstName !== undefined)
                prepared.firstName = processedData.firstName;
            if (processedData.lastName !== undefined)
                prepared.lastName = processedData.lastName;
            if (processedData.email !== undefined)
                prepared.email = processedData.email;
            if (processedData.phone !== undefined)
                prepared.phone = processedData.phone;
            if (processedData.location !== undefined)
                prepared.location = processedData.location;
            if (processedData.product !== undefined)
                prepared.product = processedData.product;
            if (processedData.selectedProduct !== undefined)
                prepared.selectedProduct = processedData.selectedProduct;
            if (processedData.budget !== undefined)
                prepared.budget = processedData.budget;
            if (processedData.coverage !== undefined)
                prepared.coverage = processedData.coverage;
            if (processedData.details !== undefined)
                prepared.details = processedData.details;
            if (processedData.contactMethod !== undefined)
                prepared.contactMethod = processedData.contactMethod;
            if (processedData.bestTime !== undefined)
                prepared.bestTime = processedData.bestTime;
            if (processedData.documents !== undefined)
                prepared.documents = processedData.documents;
            if (processedData.terms !== undefined)
                prepared.terms = processedData.terms;
            if (processedData.status !== undefined)
                prepared.status = processedData.status;
            if (processedData.timestamp !== undefined) {
                prepared.timestamp =
                    this.processDateField(processedData.timestamp) || new Date();
            }
            await this.quoteRepository.update(id, prepared);
            const updated = await this.quoteRepository.findOne({ where: { id } });
            if (!updated) {
                throw new common_1.NotFoundException(`Quote with id ${id} not found after update`);
            }
            return {
                success: true,
                message: 'Quote updated successfully',
                data: updated,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update quote with id ${id}`,
                error: error.message,
            };
        }
    }
    async updateStatus(id, status) {
        try {
            const quote = await this.quoteRepository.findOne({ where: { id } });
            if (!quote) {
                throw new common_1.NotFoundException(`quote with id ${id} not found`);
            }
            const updatedQuote = await this.quoteRepository.save({
                ...quote,
                status,
            });
            return {
                success: true,
                message: 'Quote status updated successfully',
                data: updatedQuote,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to update quote status with id ${id}`,
                error: error.message,
            };
        }
    }
    async remove(id) {
        try {
            const quote = await this.quoteRepository.findOne({ where: { id } });
            if (!quote) {
                throw new common_1.NotFoundException(`Quote with id ${id} not found`);
            }
            await this.quoteRepository.delete(id);
            return {
                success: true,
                message: 'Quote deleted successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Failed to delete quote with id ${id}`,
                error: error.message,
            };
        }
    }
    async findByStatus(status) {
        try {
            const quotes = await this.quoteRepository.find({
                where: { status },
                order: { created_at: 'DESC' },
            });
            return {
                success: true,
                message: `Quotes with status '${status}' retrieved successfully`,
                data: quotes.map((quote) => ({ ...quote, documents: quote.documents ? JSON.parse(quote.documents) : [] })),
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to retrieve quotes with status '${status}'`,
                error: error.message,
            };
        }
    }
    async findByProduct(product) {
        try {
            const quotes = await this.quoteRepository.find({
                where: { product },
                order: { created_at: 'DESC' },
            });
            return {
                success: true,
                message: `Quotes for product '${product}' retrieved successfully`,
                data: quotes.map((quote) => ({ ...quote, documents: quote.documents ? JSON.parse(quote.documents) : [] }))
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to retrieve quotes for product '${product}'`,
                error: error.message,
            };
        }
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quote_entity_1.Quote)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuotesService);
//# sourceMappingURL=quotes.service.js.map