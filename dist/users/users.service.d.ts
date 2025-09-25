import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export declare class UsersService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<ApiResponse<User>>;
    findAll(): Promise<ApiResponse<User[]>>;
    getUserById(id: number): Promise<ApiResponse<User>>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<User>>;
    findByRole(role: string): Promise<ApiResponse<User[]>>;
    deleteUser(id: number): Promise<ApiResponse<null>>;
}
export {};
