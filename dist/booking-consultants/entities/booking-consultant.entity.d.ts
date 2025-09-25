export declare enum ConsultationType {
    RISK_ASSESMENT = "Risk Assesment",
    CORPORATE_STRUCTURING = "Corporate Structuring",
    CLAIMS_AUDIT = "Claims Audit",
    POLICY_REVIEW = "Policy Review",
    INSURANCE_TRAINING = "Insurance Training",
    GENERAL_CONSULTATION = "General Consultation"
}
export declare class BookingConsultant {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    organization: string;
    consult_type: ConsultationType;
    preferred_date: string;
    preferred_time: string;
    details: string;
    created_at: Date;
}
