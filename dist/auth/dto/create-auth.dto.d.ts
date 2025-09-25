import { Role } from '../../users/entities/user.entity';
export declare class CreateAuthDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: Role;
}
