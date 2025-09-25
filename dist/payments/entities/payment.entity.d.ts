export declare enum paymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export declare class Payment {
    id: number;
    user_id: number;
    amount: number;
    currency: string;
    method: string;
    status: string;
    reference: string;
    metadata: Record<string, unknown> | null;
    created_at: Date;
    updated_at: Date;
    setAutoReference(): void;
}
