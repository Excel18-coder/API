"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
exports.default = (0, config_1.registerAs)('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    autoLoadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
}));
//# sourceMappingURL=database.config.js.map