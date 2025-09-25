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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = AuthService_1 = class AuthService {
    userRepository;
    jwtService;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async getTokens(userId, email, role) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email: email,
                role: role,
            }, {
                secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
            }),
            this.jwtService.signAsync({
                sub: userId,
                email: email,
                role: role,
            }, {
                secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
            }),
        ]);
        return { accessToken: at, refreshToken: rt };
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data, salt);
    }
    async saveRefreshToken(id, refreshToken) {
        try {
            console.log(`Saving refresh token for user ID: ${id}`);
            console.log(`Original refresh token: ${refreshToken}`);
            const hashedRefreshToken = await this.hashData(refreshToken);
            console.log(`Hashed refresh token: ${hashedRefreshToken}`);
            const result = await this.userRepository.update(id, {
                hashedRefreshToken: hashedRefreshToken,
            });
            console.log(`Update result:`, result);
            if (result.affected === 0) {
                throw new Error(`No user found with ID ${id} to update refresh token`);
            }
            const updatedUser = await this.userRepository.findOne({
                where: { id },
                select: ['id', 'hashedRefreshToken'],
            });
            console.log(`Verification - User ${id} hashedRefreshToken:`, updatedUser?.hashedRefreshToken);
        }
        catch (error) {
            console.error('Error saving refresh token:', error);
            throw error;
        }
    }
    async register(createAuthDto) {
        const { email, password, name, phoneNumber } = createAuthDto;
        try {
            if (!email || !password || !name || !phoneNumber) {
                this.logger.warn(`Invalid input data for user registration: ${JSON.stringify({
                    email: !!email,
                    password: !!password,
                    name: !!name,
                    phoneNumber: !!phoneNumber,
                })}`);
                throw new common_1.BadRequestException('Email, password, full name, address, and phone number are required');
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.logger.warn(`Invalid email format provided during registration: ${email}`);
                throw new common_1.BadRequestException('Invalid email format');
            }
            if (password.length < 6) {
                this.logger.warn('Password too short during registration');
                throw new common_1.BadRequestException('Password must be at least 6 characters long');
            }
            this.logger.log(`Checking if user exists during registration with email: ${email}`);
            const existingUser = await this.userRepository.findOne({
                where: { email: email.toLowerCase().trim() },
            });
            if (existingUser) {
                this.logger.warn(`Registration attempt with existing email: ${email}`);
                throw new common_1.ConflictException({
                    message: 'A user with this email address already exists',
                    email: email,
                    suggestion: 'Please use a different email address or try logging in',
                });
            }
            if (phoneNumber) {
                this.logger.log(`Checking if phone number exists during registration: ${phoneNumber}`);
                const existingPhoneUser = await this.userRepository.findOne({
                    where: { phoneNumber: phoneNumber.trim() },
                });
                if (existingPhoneUser) {
                    this.logger.warn(`Registration attempt with existing phone number: ${phoneNumber}`);
                    throw new common_1.ConflictException({
                        message: 'A user with this phone number already exists',
                        phoneNumber: phoneNumber,
                        suggestion: 'Please use a different phone number',
                    });
                }
            }
            let hashedPassword;
            try {
                hashedPassword = await this.hashData(password);
            }
            catch (hashError) {
                this.logger.error('Password hashing failed during registration', hashError instanceof Error ? hashError.stack : 'Unknown error');
                throw new common_1.InternalServerErrorException('Failed to secure password');
            }
            const userData = {
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                name: name.trim(),
                phoneNumber: phoneNumber.trim(),
                role: createAuthDto.role || user_entity_1.Role.USER,
            };
            const newUser = this.userRepository.create(userData);
            let savedUser;
            try {
                savedUser = await this.userRepository.save(newUser);
                this.logger.log(`User registered successfully with ID: ${savedUser.id}, Email: ${savedUser.email}`);
            }
            catch (saveError) {
                if (saveError instanceof typeorm_2.QueryFailedError) {
                    if (saveError.message.includes('duplicate key value violates unique constraint')) {
                        if (saveError.message.includes('email')) {
                            this.logger.warn(`Database unique constraint violation during registration for email: ${email}`);
                            throw new common_1.ConflictException({
                                message: 'Email address is already registered',
                                email: email,
                                suggestion: 'Please use a different email address or try logging in',
                            });
                        }
                        if (saveError.message.includes('phone')) {
                            this.logger.warn(`Database unique constraint violation during registration for phone: ${phoneNumber}`);
                            throw new common_1.ConflictException({
                                message: 'Phone number is already registered',
                                phoneNumber: phoneNumber,
                                suggestion: 'Please use a different phone number',
                            });
                        }
                    }
                    if (saveError.message.includes('not-null constraint')) {
                        this.logger.error('Required field missing during user registration', saveError.message);
                        throw new common_1.BadRequestException('Required fields are missing');
                    }
                }
                this.logger.error('Database save operation failed during registration', {
                    error: saveError instanceof Error ? saveError.message : 'Unknown error',
                    stack: saveError instanceof Error ? saveError.stack : 'No stack trace',
                    userData: { email, name, phoneNumber },
                });
                throw new common_1.InternalServerErrorException({
                    message: 'Failed to create user account',
                    suggestion: 'Please try again later or contact support if the problem persists',
                });
            }
            return {
                success: true,
                message: 'User registered successfully',
                data: {
                    id: savedUser.id,
                    email: savedUser.email,
                    role: savedUser.role,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            this.logger.error('Unexpected error during user registration', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : 'No stack trace',
                userData: { email, name, phoneNumber },
            });
            this.logger.error('Unexpected error during user registration', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : 'No stack trace',
                userData: { email },
            });
            throw new common_1.InternalServerErrorException({
                message: 'An unexpected error occurred while creating the user account',
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async signIn(createAuthDto) {
        const foundUser = await this.userRepository.findOne({
            where: { email: createAuthDto.email },
            select: [
                'id',
                'email',
                'password',
                'role',
                'name',
                'phoneNumber',
            ],
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with email ${createAuthDto.email} not found`);
        }
        const foundPassword = await bcrypt.compare(createAuthDto.password, foundUser.password);
        if (!foundPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('Password validation successful - user authenticated');
        const { accessToken, refreshToken } = await this.getTokens(foundUser.id, foundUser.email, foundUser.role);
        console.log(`Generated tokens for user ${foundUser.id}:`, {
            accessTokenLength: accessToken.length,
            refreshTokenLength: refreshToken.length,
        });
        await this.saveRefreshToken(foundUser.id, refreshToken);
        console.log('Refresh token saved successfully');
        console.log(foundUser);
        return {
            accessToken,
            refreshToken,
            user: {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                phoneNumber: foundUser.phoneNumber,
                role: foundUser.role,
            },
        };
    }
    async signOut(id) {
        const res = await this.userRepository.update(id, {});
        if (res.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return { message: `User with id : ${id} signed out successfully` };
    }
    async refreshTokens(id, _refreshToken) {
        const foundUser = await this.userRepository.findOne({
            where: { id: id },
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        throw new common_1.NotFoundException('No refresh token found');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map