import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User, Role } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
export type JWTPayload = {
    sub: number;
    role: Role;
    email: string;
};
declare const AtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AtStrategy extends AtStrategy_base {
    private userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(payload: JWTPayload): Promise<{
        id: number;
        sub: number;
        email: string;
        role: Role;
        name: string;
        phoneNumber: string;
    } | null>;
}
export {};
