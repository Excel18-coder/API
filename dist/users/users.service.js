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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_entity_2 = require("./entities/user.entity");
let UsersService = UsersService_1 = class UsersService {
    userRepository;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        const { email, password: userPassword, name, phoneNumber, } = createUserDto;
        try {
            if (!email || !userPassword || !name) {
                this.logger.warn(`Invalid input data for user creation: ${JSON.stringify({ email: !!email, password: !!userPassword, name: !!name })}`);
                throw new common_1.BadRequestException('Email, password, and full name are required');
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.logger.warn(`Invalid email format provided: ${email}`);
                throw new common_1.BadRequestException('Invalid email format');
            }
            if (userPassword.length < 6) {
                this.logger.warn('Password too short');
                throw new common_1.BadRequestException('Password must be at least 6 characters long');
            }
            this.logger.log(`Checking if user exists with email: ${email}`);
            const existingUser = await this.userRepository.findOne({
                where: { email: email.toLowerCase().trim() },
            });
            if (existingUser) {
                this.logger.warn(`User registration attempt with existing email: ${email}`);
                throw new common_1.ConflictException({
                    message: 'A user with this email address already exists',
                    email: email,
                    suggestion: 'Please use a different email address or try logging in',
                });
            }
            if (phoneNumber) {
                this.logger.log(`Checking if phone number exists: ${phoneNumber}`);
                const existingPhoneUser = await this.userRepository.findOne({
                    where: { phoneNumber: phoneNumber.trim() },
                });
                if (existingPhoneUser) {
                    this.logger.warn(`User registration attempt with existing phone number: ${phoneNumber}`);
                    throw new common_1.ConflictException({
                        message: 'A user with this phone number already exists',
                        phoneNumber: phoneNumber,
                        suggestion: 'Please use a different phone number',
                    });
                }
            }
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(userPassword, 12);
            }
            catch (hashError) {
                this.logger.error('Password hashing failed', hashError.stack);
                throw new common_1.InternalServerErrorException('Failed to secure password');
            }
            const userData = {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                phoneNumber: phoneNumber?.trim() || createUserDto.phoneNumber,
                role: createUserDto.role,
            };
            const newUser = this.userRepository.create(userData);
            let savedUser;
            try {
                savedUser = await this.userRepository.save(newUser);
                this.logger.log(`User created successfully with ID: ${savedUser.id}, Email: ${savedUser.email}`);
            }
            catch (saveError) {
                if (saveError instanceof typeorm_2.QueryFailedError) {
                    if (saveError.message.includes('duplicate key value violates unique constraint')) {
                        if (saveError.message.includes('email')) {
                            this.logger.warn(`Database unique constraint violation for email: ${email}`);
                            throw new common_1.ConflictException({
                                message: 'Email address is already registered',
                                email: email,
                                suggestion: 'Please use a different email address',
                            });
                        }
                        if (saveError.message.includes('phone')) {
                            this.logger.warn(`Database unique constraint violation for phone: ${phoneNumber}`);
                            throw new common_1.ConflictException({
                                message: 'Phone number is already registered',
                                phoneNumber: phoneNumber,
                                suggestion: 'Please use a different phone number',
                            });
                        }
                    }
                    if (saveError.message.includes('not-null constraint')) {
                        this.logger.error('Required field missing during user creation', saveError.message);
                        throw new common_1.BadRequestException('Required fields are missing');
                    }
                }
                this.logger.error('Database save operation failed', {
                    error: saveError.message,
                    stack: saveError.stack,
                    userData: { email, name, phoneNumber },
                });
                throw new common_1.InternalServerErrorException({
                    message: 'Failed to create user account',
                    suggestion: 'Please try again later or contact support if the problem persists',
                });
            }
            const { password, ...userWithoutPassword } = savedUser;
            return {
                success: true,
                message: 'User account created successfully',
                data: userWithoutPassword,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            this.logger.error('Unexpected error during user creation', {
                error: error.message,
                stack: error.stack,
                userData: { email, name, phoneNumber },
            });
            throw new common_1.InternalServerErrorException({
                message: 'An unexpected error occurred while creating the user account',
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async findAll() {
        try {
            this.logger.log('Fetching all users');
            const users = await this.userRepository.find({
                select: [
                    'id',
                    'name',
                    'email',
                    'phoneNumber',
                    'role',
                ],
            });
            this.logger.log(`Successfully retrieved ${users.length} users`);
            return {
                success: true,
                message: `Found ${users.length} users`,
                data: users,
            };
        }
        catch (error) {
            this.logger.error('Failed to fetch users', {
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException({
                message: 'Failed to retrieve users',
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async getUserById(id) {
        try {
            if (!id || isNaN(id) || id <= 0) {
                this.logger.warn(`Invalid user ID provided: ${id}`);
                throw new common_1.BadRequestException('Invalid user ID provided');
            }
            this.logger.log(`Fetching user with ID: ${id}`);
            const user = await this.userRepository.findOne({
                where: { id },
                select: [
                    'id',
                    'name',
                    'email',
                    'phoneNumber',
                    'role',
                ],
            });
            if (!user) {
                this.logger.warn(`User not found with ID: ${id}`);
                throw new common_1.NotFoundException({
                    message: `User with ID ${id} not found`,
                    userId: id,
                    suggestion: 'Please verify the user ID and try again',
                });
            }
            this.logger.log(`Successfully retrieved user with ID: ${id}`);
            return {
                success: true,
                message: 'User found successfully',
                data: user,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            this.logger.error(`Failed to find user with ID: ${id}`, {
                error: error.message,
                stack: error.stack,
                userId: id,
            });
            throw new common_1.InternalServerErrorException({
                message: `Failed to retrieve user with ID ${id}`,
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            if (!id || isNaN(id) || id <= 0) {
                this.logger.warn(`Invalid user ID provided for update: ${id}`);
                throw new common_1.BadRequestException('Invalid user ID provided');
            }
            if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
                this.logger.warn(`No update data provided for user ID: ${id}`);
                throw new common_1.BadRequestException('No update data provided');
            }
            this.logger.log(`Updating user with ID: ${id}`);
            const existingUser = await this.userRepository.findOne({ where: { id } });
            if (!existingUser) {
                this.logger.warn(`User not found for update with ID: ${id}`);
                throw new common_1.NotFoundException({
                    message: `User with ID ${id} not found`,
                    userId: id,
                    suggestion: 'Please verify the user ID and try again',
                });
            }
            if (updateUserDto.role) {
                const validRoles = ['admin', 'driver', 'user'];
                if (!validRoles.includes(updateUserDto.role)) {
                    throw new common_1.BadRequestException({
                        message: `Invalid role: ${updateUserDto.role}`,
                        validRoles,
                    });
                }
            }
            if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
                const emailExists = await this.userRepository.findOne({
                    where: { email: updateUserDto.email.toLowerCase().trim() },
                });
                if (emailExists) {
                    this.logger.warn(`Email conflict during update for user ID: ${id}, email: ${updateUserDto.email}`);
                    throw new common_1.ConflictException({
                        message: 'Email address is already in use by another user',
                        email: updateUserDto.email,
                        suggestion: 'Please use a different email address',
                    });
                }
            }
            const updateData = { ...updateUserDto };
            if (updateUserDto.password) {
                try {
                    updateData.password = await bcrypt.hash(updateUserDto.password, 12);
                    this.logger.log(`Password updated for user ID: ${id}`);
                }
                catch (hashError) {
                    this.logger.error('Password hashing failed during update', hashError.stack);
                    throw new common_1.InternalServerErrorException('Failed to secure new password');
                }
            }
            if (updateData.email) {
                updateData.email = updateData.email.toLowerCase().trim();
            }
            if (updateData.name) {
                updateData.name = updateData.name.trim();
            }
            if (updateData.phoneNumber) {
                updateData.phoneNumber = updateData.phoneNumber.trim();
            }
            this.logger.debug('Prepared update data:', {
                userId: id,
                updateData,
            });
            let userToUpdate;
            try {
                userToUpdate = await this.userRepository.preload({
                    id: id,
                    ...updateData,
                });
            }
            catch (preloadError) {
                this.logger.error('Failed to preload user data for update', {
                    error: preloadError.message,
                    stack: preloadError.stack,
                    userId: id,
                });
                throw new common_1.InternalServerErrorException('Failed to prepare user data for update');
            }
            if (userToUpdate) {
                userToUpdate = (0, class_transformer_1.plainToInstance)(user_entity_1.User, userToUpdate);
            }
            if (!userToUpdate) {
                this.logger.error(`Preload returned null for user ID: ${id}`);
                throw new common_1.NotFoundException({
                    message: `User with ID ${id} not found`,
                    userId: id,
                });
            }
            const dtoInstance = (0, class_transformer_1.plainToInstance)(update_user_dto_1.UpdateUserDto, updateData);
            const errors = await (0, class_validator_1.validate)(dtoInstance);
            if (errors.length > 0) {
                this.logger.error('User DTO validation failed', {
                    error: 'Validation failed',
                    invalidFields: errors,
                    userId: id,
                });
                console.error('Validation errors:', JSON.stringify(errors, null, 2));
                throw new common_1.BadRequestException(errors);
            }
            let updatedUser;
            try {
                updatedUser = await this.userRepository.save(userToUpdate);
                this.logger.log(`User updated successfully with ID: ${id}`);
            }
            catch (saveError) {
                this.logger.error('Full save error details:', {
                    message: saveError.message,
                    name: saveError.name,
                    code: saveError.code,
                    driverError: saveError.driverError,
                    stack: saveError.stack,
                    userId: id,
                });
                if (saveError instanceof typeorm_2.QueryFailedError) {
                    if (saveError.driverError?.code === '23505') {
                        if (saveError.message.includes('email')) {
                            throw new common_1.ConflictException({
                                message: 'Email address is already registered',
                                email: updateData.email,
                                suggestion: 'Please use a different email address',
                            });
                        }
                    }
                    else if (saveError.driverError?.code === '23503') {
                        if (saveError.message.includes('role')) {
                            throw new common_1.BadRequestException({
                                message: 'Invalid role specified',
                                role: updateData.role,
                                validRoles: ['admin', 'driver', 'user'],
                            });
                        }
                    }
                    else if (saveError.driverError?.code === '23502') {
                        const column = saveError.message.match(/column "([^"]+)"/i)?.[1];
                        throw new common_1.BadRequestException({
                            message: `Required field ${column} is missing or null`,
                            field: column,
                        });
                    }
                }
                throw new common_1.InternalServerErrorException({
                    message: 'Failed to save user updates',
                    errorDetails: {
                        code: saveError.code,
                        constraint: saveError.driverError?.constraint,
                    },
                    suggestion: 'Please try again later or contact support',
                });
            }
            const { password, ...userWithoutPassword } = updatedUser;
            return {
                success: true,
                message: 'User updated successfully',
                data: userWithoutPassword,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            this.logger.error(`Unexpected error during user update with ID: ${id}`, {
                error: error.message,
                stack: error.stack,
                userId: id,
            });
            throw new common_1.InternalServerErrorException({
                message: `Failed to update user with ID ${id}`,
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async findByRole(role) {
        try {
            const users = await this.userRepository.find({
                where: { role: role },
                select: ['id', 'name', 'email', 'phoneNumber', 'role'],
            });
            return {
                success: true,
                message: `Found ${users.length} users with role ${role}`,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: 'Failed to retrieve users by role',
                suggestion: 'Please try again later or contact support',
            });
        }
    }
    async deleteUser(id) {
        this.logger.debug(`[SoftDelete] Called deleteUser for ID: ${id}`);
        try {
            if (!id || isNaN(id) || id <= 0) {
                this.logger.warn(`[SoftDelete] Invalid user ID provided for deletion: ${id}`);
                throw new common_1.BadRequestException('Invalid user ID provided');
            }
            this.logger.log(`[SoftDelete] Attempting to soft delete user with ID: ${id}`);
            const existingUser = await this.userRepository.findOne({ where: { id } });
            if (!existingUser) {
                this.logger.warn(`[SoftDelete] User not found for deletion with ID: ${id}`);
                throw new common_1.NotFoundException({
                    message: `User with ID ${id} not found`,
                    userId: id,
                    suggestion: 'Please verify the user ID and try again',
                });
            }
            if (existingUser.role === user_entity_2.Role.ADMIN) {
                this.logger.warn(`[SoftDelete] Attempt to delete admin user with ID: ${id}`);
                throw new common_1.BadRequestException({
                    message: 'Admin users cannot be deleted',
                    suggestion: 'Please contact system administrator',
                });
            }
            this.logger.debug(`[SoftDelete] Setting deletedAt for user ID: ${id}`);
            try {
                await this.userRepository.save(existingUser);
                this.logger.debug(`[SoftDelete] User with ID: ${id} soft deleted (deletedAt set).`);
            }
            catch (saveError) {
                this.logger.error('[SoftDelete] Database soft delete operation failed', {
                    error: saveError.message,
                    stack: saveError.stack,
                    userId: id,
                });
                throw new common_1.InternalServerErrorException({
                    message: 'Failed to soft delete user',
                    suggestion: 'Please try again later or contact support',
                });
            }
            this.logger.log(`[SoftDelete] User soft deleted successfully with ID: ${id}`);
            return {
                success: true,
                message: `User with ID ${id} soft deleted successfully`,
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            this.logger.error(`[SoftDelete] Unexpected error during user soft deletion with ID: ${id}`, {
                error: error.message,
                stack: error.stack,
                userId: id,
            });
            throw new common_1.InternalServerErrorException({
                message: `Failed to soft delete user with ID ${id}`,
                suggestion: 'Please try again later or contact support',
            });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map