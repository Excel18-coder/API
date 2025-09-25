"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    logger = new common_1.Logger(AllExceptionsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error occurred';
        let error = 'Internal Server Error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
                error = exception.name;
            }
            else if (typeof exceptionResponse === 'object') {
                const responseObj = exceptionResponse;
                message = {
                    error: responseObj.error || exception.name,
                    message: responseObj.message || 'Validation failed',
                    details: Array.isArray(responseObj.message) ? responseObj.message : [responseObj.message]
                };
                error = responseObj.error || exception.name;
            }
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            if (exception.message.includes('duplicate key value violates unique constraint')) {
                if (exception.message.includes('email')) {
                    message = {
                        message: 'Email address is already registered',
                        suggestion: 'Please use a different email address or try logging in',
                    };
                    error = 'Conflict';
                    status = common_1.HttpStatus.CONFLICT;
                }
                else if (exception.message.includes('phone')) {
                    message = {
                        message: 'Phone number is already registered',
                        suggestion: 'Please use a different phone number',
                    };
                    error = 'Conflict';
                    status = common_1.HttpStatus.CONFLICT;
                }
                else {
                    message = {
                        message: 'Duplicate entry detected',
                        suggestion: 'Please check your input and try again',
                    };
                    error = 'Conflict';
                    status = common_1.HttpStatus.CONFLICT;
                }
            }
            else if (exception.message.includes('not-null constraint')) {
                message = {
                    message: 'Required fields are missing',
                    suggestion: 'Please ensure all required fields are provided',
                };
                error = 'Bad Request';
            }
            else if (exception.message.includes('foreign key constraint')) {
                message = {
                    message: 'Cannot perform operation due to related data',
                    suggestion: 'Please ensure all related data is valid or remove dependencies first',
                };
                error = 'Conflict';
                status = common_1.HttpStatus.CONFLICT;
            }
            else {
                message = {
                    message: 'Database operation failed',
                    suggestion: 'Please check your input and try again',
                };
                error = 'Database Error';
            }
        }
        else {
            message = {
                message: 'Internal server error occurred',
                suggestion: 'Please try again later or contact support if the problem persists',
            };
            error = 'Internal Server Error';
        }
        this.logger.error(`${request.method} ${request.url} - Status: ${status}`, {
            exception: exception instanceof Error ? exception.message : String(exception),
            stack: exception instanceof Error ? exception.stack : undefined,
            request: {
                method: request.method,
                url: request.url,
                body: request.body,
                params: request.params,
                query: request.query,
                headers: {
                    'user-agent': request.get('user-agent'),
                    'content-type': request.get('content-type'),
                },
            },
        });
        response.status(status).json({
            success: false,
            statusCode: status,
            error: error,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map