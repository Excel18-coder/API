import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<ApiResponse<User>>;
    findAllUsers(): Promise<ApiResponse<User[]>>;
    getUserById(id: number): Promise<ApiResponse<User>>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<User>>;
    deleteUser(id: number): Promise<ApiResponse<null>>;
    getUsersByRole(role: string): Promise<ApiResponse<User[]>>;
}
export {};
