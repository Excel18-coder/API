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
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const claims_service_1 = require("./claims.service");
const create_claim_dto_1 = require("./dto/create-claim.dto");
const update_claim_dto_1 = require("./dto/update-claim.dto");
const swagger_1 = require("@nestjs/swagger");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
let ClaimsController = class ClaimsController {
    claimsService;
    cloudinaryService;
    constructor(claimsService, cloudinaryService) {
        this.claimsService = claimsService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createClaimDto, files) {
        let uploadedDocuments = [];
        if (files && files.length > 0) {
            try {
                const uploadResults = await this.cloudinaryService.uploadFiles(files);
                uploadedDocuments = uploadResults.map((result) => ({
                    original_name: result.original_name,
                    size: result.bytes,
                    created_at: new Date().toISOString(),
                    path: result.path,
                    mime_type: result.format,
                    public_id: result.public_id,
                }));
            }
            catch (error) {
                console.error('File upload error:', error);
                throw new Error('Failed to upload files');
            }
        }
        const claimData = {
            ...createClaimDto,
            supporting_documents: uploadedDocuments,
        };
        return this.claimsService.createClaim(claimData);
    }
    findAll() {
        return this.claimsService.findAll();
    }
    getClaimById(id) {
        return this.claimsService.getClaimById(id);
    }
    async updateClaim(id, updateClaimDto) {
        return this.claimsService.updateClaim(id, updateClaimDto);
    }
    async updateClaimStatus(id, updateClaimDto) {
        return this.claimsService.updateClaimStatus(id, updateClaimDto);
    }
    async deleteClaim(id) {
        return this.claimsService.deleteClaim(id);
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('supporting_documents')),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                policy_number: { type: 'string' },
                claim_type: { type: 'string' },
                incident_date: { type: 'string', format: 'date' },
                estimated_loss: { type: 'number' },
                description: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                supporting_documents: {
                    oneOf: [
                        {
                            type: 'string',
                            format: 'binary',
                        },
                        {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'binary',
                            },
                        },
                    ],
                },
            },
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
    __metadata("design:paramtypes", [create_claim_dto_1.CreateClaimDto, Array]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getClaimById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_claim_dto_1.UpdateClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "updateClaim", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "updateClaimStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "deleteClaim", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, common_1.Controller)('claims'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService,
        cloudinary_service_1.CloudinaryService])
], ClaimsController);
//# sourceMappingURL=claims.controller.js.map