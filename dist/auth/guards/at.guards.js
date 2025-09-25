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
exports.AtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_2 = require("typeorm");
let AtStrategy = class AtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    userRepository;
    constructor(configService, userRepository) {
        const secret = configService.get('JWT_ACCESS_TOKEN_SECRET');
        if (!secret) {
            throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in environment variables');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        });
        this.userRepository = userRepository;
    }
    async validate(payload) {
        console.log('🔑 AtStrategy - JWT payload received:', payload);
        console.log('🔑 AtStrategy - Payload role type:', typeof payload.role);
        console.log('🔑 AtStrategy - Payload role value:', payload.role);
        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
        });
        if (!user) {
            console.log('❌ AtStrategy - User not found in database');
            return null;
        }
        console.log('✅ AtStrategy - User found and validated:', {
            id: user.id,
            email: user.email,
            role: user.role,
            roleType: typeof user.role,
            name: user.name,
        });
        const userObject = {
            id: user.id,
            sub: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            phoneNumber: user.phoneNumber,
        };
        console.log('🔑 AtStrategy - Returning user object:', userObject);
        return userObject;
    }
};
exports.AtStrategy = AtStrategy;
exports.AtStrategy = AtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], AtStrategy);
//# sourceMappingURL=at.guards.js.map