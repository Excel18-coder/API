import { Role } from '../entities/user.entity';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: Role;
}
