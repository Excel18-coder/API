"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const db_config_1 = require("./config/db.config");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const users_module_1 = require("./users/users.module");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const throttler_guard_1 = require("./rate limiter/throttler.guard");
const claims_module_1 = require("./claims/claims.module");
const quotes_module_1 = require("./quotes/quotes.module");
const consultations_module_1 = require("./consultations/consultations.module");
const diaspora_requests_module_1 = require("./diaspora_requests/diaspora_requests.module");
const outsourcing_requests_module_1 = require("./outsourcing_requests/outsourcing_requests.module");
const payments_module_1 = require("./payments/payments.module");
const booking_consultants_module_1 = require("./booking-consultants/booking-consultants.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const based_consultation_module_1 = require("./based-consultation/based-consultation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot(db_config_1.typeOrmConfig),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60_000,
                    limit: 20,
                },
            ]),
            claims_module_1.ClaimsModule,
            quotes_module_1.QuotesModule,
            consultations_module_1.ConsultationsModule,
            diaspora_requests_module_1.DiasporaRequestsModule,
            outsourcing_requests_module_1.OutsourcingRequestsModule,
            payments_module_1.PaymentsModule,
            booking_consultants_module_1.BookingConsultantsModule,
            dashboard_module_1.DashboardModule,
            based_consultation_module_1.BasedConsultationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_guard_1.CustomThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map