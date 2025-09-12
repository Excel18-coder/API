import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // Enable validation pipe with detailed errors
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Enable Helmet for security
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.tailwindcss.com'],
          styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
          fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
          imgSrc: ["'self'", 'data:', '*.postgresql.org', 'nestjs.com'],
        },
      },
    }),
  );
  // Enable CORS
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://gallo-front.vercel.app/'], // Allow all origins - adjust as needed for production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });
  // enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit type conversion
      },
    }),
  );

  // Use global exception filter to handle all errors gracefully
  app.useGlobalFilters(new AllExceptionsFilter());

  // api versioning
  app.setGlobalPrefix('api/v1');
  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Gallo API')
  
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:8000', 'Local Development Server')
    .addServer('https://gallo-api.com', 'Production Server')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, AuthModule],
  });
  SwaggerModule.setup('docs', app, document, {
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
    // customfavIcon: 'https://example.com/favicon.ico', // Replace with your favicon URL
  });

  // Serve static files from uploads directory
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // await app.listen(process.env.PORT ?? 8000);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 8000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
