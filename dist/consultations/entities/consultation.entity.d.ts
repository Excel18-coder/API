export declare enum ConsultationStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    CONTACTED = "contacted",
    SCHEDULED = "scheduled"
}
export declare enum ConsultType {
    ONLINE = "Online",
    PHYSICAL = "Physical"
}
export declare class Consultation {
    id: number;
    user_id: number;
    full_name: string;
    phone: string;
    time: Date;
    consult_type: ConsultType;
    date: Date;
    service_type: string;
    country: string;
    status: ConsultationStatus;
    created_at: Date;
    updated_at: Date;
}
