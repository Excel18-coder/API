export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    hashedRefreshToken?: string | null;
    role: Role;
    hashPassword(): Promise<void>;
    normalizeEmail(): void;
    trimStrings(): void;
    validatePassword(password: string): Promise<boolean>;
    created_at: Date;
    updated_at: Date;
}
