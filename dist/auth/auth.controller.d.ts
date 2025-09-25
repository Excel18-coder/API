import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { AuthService } from './auth.service';
export interface RequestWithUser extends Request {
    user: {
        sub: number;
        email: string;
        refreshToken: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signInLocal(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            role: import("../users/entities/user.entity").Role;
        };
    }>;
    register(createAuthDto: CreateAuthDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            role: import("../users/entities/user.entity").Role;
        };
    }>;
    signOut(id: number): Promise<{
        message: string;
    }>;
    refreshTokens(id: number, req: RequestWithUser): Promise<void>;
}
