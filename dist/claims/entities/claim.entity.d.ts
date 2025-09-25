export declare enum claimStatus {
    PENDING = "pending  ",
    APPROVED = "approved",
    REJECTED = "rejected",
    IN_REVIEW = "in-review",
    CLOSED = "closed",
    PROCCESSING = "processing"
}
export declare enum ClaimType {
    MOTOR = "Motor",
    HEALTH = "Health",
    PROPERTY = "Property",
    TRAVEL = "Travel",
    LIFE = "Life",
    PUBLIC_LIABILITY = "Public liability",
    FIDELITY_GUARANTEE = "Fidelity guarantee",
    WORKSMEN_COMPENSATION_ACCIDENT = "Worksmen compensation accident",
    WINDSCREEN_AND_WINDOW_DAMAGE = "Windscreen and window damage",
    MOTOR_ENTERTAINMENT = "Motor entertainment",
    MOTOR_THEFT = "Motor theft"
}
export interface Document {
    id: number;
    original_name: string;
    size: number;
    created_at: string;
    path?: string;
    mime_type?: string;
}
export declare class Claim {
    Id: number;
    policy_number: number;
    claim_type: ClaimType;
    incident_date: Date;
    estimated_loss: number;
    description: string;
    status: claimStatus;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
    supporting_documents: string;
}
