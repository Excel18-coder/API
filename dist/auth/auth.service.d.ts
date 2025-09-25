import { CreateAuthDto } from './dto/create-auth.dto';
import { Role, User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    private getTokens;
    private hashData;
    private saveRefreshToken;
    register(createAuthDto: CreateAuthDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            role: Role;
        };
    }>;
    signIn(createAuthDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            role: Role;
        };
    }>;
    signOut(id: number): Promise<{
        message: string;
    }>;
    refreshTokens(id: number, _refreshToken: string): Promise<void>;
}
