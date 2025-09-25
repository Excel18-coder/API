"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: true,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
};
//# sourceMappingURL=db.config.js.map