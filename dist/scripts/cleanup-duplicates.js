"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupDuplicatePhoneNumbers = cleanupDuplicatePhoneNumbers;
const user_entity_1 = require("../users/entities/user.entity");
async function cleanupDuplicatePhoneNumbers(dataSource) {
    const userRepository = dataSource.getRepository(user_entity_1.User);
    const duplicates = await userRepository
        .createQueryBuilder('user')
        .select('user.phoneNumber')
        .addSelect('COUNT(*)', 'count')
        .groupBy('user.phoneNumber')
        .having('COUNT(*) > 1')
        .getRawMany();
    console.log('Found duplicate phone numbers:', duplicates);
    for (const duplicate of duplicates) {
        const phoneNumber = duplicate.user_phoneNumber;
        const usersWithDuplicatePhone = await userRepository.find({
            where: { phoneNumber },
            order: { id: 'ASC' },
        });
        console.log(`Processing ${usersWithDuplicatePhone.length} users with phone number: ${phoneNumber}`);
        for (let i = 1; i < usersWithDuplicatePhone.length; i++) {
            const user = usersWithDuplicatePhone[i];
            const newPhoneNumber = `${phoneNumber}_${user.id}`;
            await userRepository.update(user.id, {
                phoneNumber: newPhoneNumber,
            });
            console.log(`Updated user ${user.id} phone number from ${phoneNumber} to ${newPhoneNumber}`);
        }
    }
    console.log('Cleanup completed successfully');
}
//# sourceMappingURL=cleanup-duplicates.js.map