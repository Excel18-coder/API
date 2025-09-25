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
exports.QuotesController = void 0;
const common_1 = require("@nestjs/common");
const quotes_service_1 = require("./quotes.service");
const create_quote_dto_1 = require("./dto/create-quote.dto");
const update_quote_dto_1 = require("./dto/update-quote.dto");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let QuotesController = class QuotesController {
    quotesService;
    cloudinaryService;
    constructor(quotesService, cloudinaryService) {
        this.quotesService = quotesService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createQuoteDto, files) {
        let uploadedDocuments = [];
        if (files && files.length > 0) {
            try {
                const uploadResults = await this.cloudinaryService.uploadFiles(files);
                uploadedDocuments = uploadResults.map((result) => ({
                    original_name: result?.original_name ?? "Uploaded_file",
                    size: result.size,
                    created_at: new Date().toISOString(),
                    path: result.path,
                    mime_type: result.mime_type,
                    public_id: result.public_id,
                }));
            }
            catch (error) {
                console.error('File upload error:', error);
                throw new common_1.HttpException('Failed to upload files', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const quoteData = {
            ...createQuoteDto,
            documents: uploadedDocuments,
        };
        return this.quotesService.create(quoteData);
    }
    findAll() {
        return this.quotesService.findAll();
    }
    findOne(id) {
        return this.quotesService.findOne(id);
    }
    update(id, updateQuoteDto) {
        return this.quotesService.update(id, updateQuoteDto);
    }
    updateStatus(id, body) {
        return this.quotesService.updateStatus(id, body.status);
    }
    remove(id) {
        return this.quotesService.remove(id);
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('documents')),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                location: { type: 'string' },
                product: { type: 'string' },
                budget: { type: 'string' },
                coverage: { type: 'string' },
                details: { type: 'string' },
                contactMethod: { type: 'string' },
                bestTime: { type: 'string' },
                terms: { type: 'boolean' },
                selectedProduct: { type: 'string' },
                status: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                documents: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
            required: ['firstName', 'email', 'terms'],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|pdf|doc|docx)$/ }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quote_dto_1.CreateQuoteDto, Array]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_quote_dto_1.UpdateQuoteDto]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "remove", null);
exports.QuotesController = QuotesController = __decorate([
    (0, common_1.Controller)('quotes'),
    __metadata("design:paramtypes", [quotes_service_1.QuotesService,
        cloudinary_service_1.CloudinaryService])
], QuotesController);
//# sourceMappingURL=quotes.controller.js.map