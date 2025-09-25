"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFullNameToUsers1700000000001 = void 0;
class AddFullNameToUsers1700000000001 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "fullName" character varying(100)`);
        await queryRunner.query(`
            UPDATE "users" 
            SET "fullName" = COALESCE("firstName" || ' ' || "lastName", 'Unknown User')
        `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "fullName" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
    }
}
exports.AddFullNameToUsers1700000000001 = AddFullNameToUsers1700000000001;
//# sourceMappingURL=1712345678901-AddFullNameToUsers.js.map