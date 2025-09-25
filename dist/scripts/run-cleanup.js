"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const cleanup_duplicates_1 = require("./cleanup-duplicates");
const user_entity_1 = require("../users/entities/user.entity");
async function main() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'Groceries',
        entities: [user_entity_1.User, Location],
        synchronize: false,
        logging: true,
    });
    try {
        await dataSource.initialize();
        console.log('Database connected successfully');
        await (0, cleanup_duplicates_1.cleanupDuplicatePhoneNumbers)(dataSource);
        console.log('Cleanup script completed successfully');
    }
    catch (error) {
        console.error('Error during cleanup:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
main().catch(console.error);
//# sourceMappingURL=run-cleanup.js.map