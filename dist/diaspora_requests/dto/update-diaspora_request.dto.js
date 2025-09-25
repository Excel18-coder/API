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
exports.UpdateDiasporaRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_diaspora_request_dto_1 = require("./create-diaspora_request.dto");
const class_validator_1 = require("class-validator");
class UpdateDiasporaRequestDto extends (0, swagger_1.PartialType)(create_diaspora_request_dto_1.CreateDiasporaRequestDto) {
    id;
}
exports.UpdateDiasporaRequestDto = UpdateDiasporaRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateDiasporaRequestDto.prototype, "id", void 0);
//# sourceMappingURL=update-diaspora_request.dto.js.map