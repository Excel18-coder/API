"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const express = require("express");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        cors: false,
    });
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
            res.header('Access-Control-Max-Age', '86400');
            return res.status(200).end();
        }
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.tailwindcss.com'],
                styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
                fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
                imgSrc: ["'self'", 'data:', '*.postgresql.org', 'nestjs.com'],
            },
        },
    }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Gallo API')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('http://localhost:8000', 'Local Development Server')
        .addServer('https://gallo-api.com', 'Production Server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [users_module_1.UsersModule, auth_module_1.AuthModule],
    });
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            docExpansion: 'none',
            persistAuthorization: true,
            operationsSorter: 'alpha',
            showRequestDuration: true,
            tryItOutEnabled: true,
            filter: true,
            showTags: true,
        },
        customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin-bottom: 20px; }
    `,
        customSiteTitle: 'Olive Groceries API Documentation',
    });
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 8000;
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map