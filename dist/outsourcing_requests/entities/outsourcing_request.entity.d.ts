export declare enum OutsourcingService {
    UNDERWRITING_SUPPORT = "Underwriting Support",
    CLAIMS_AUDIT = "Claims Audit",
    CLAIMS_DATA_MANAGEMENT = "Claims Data Management",
    QUOTATION_SUPPORT = "Quotation Support",
    RENEWAL_NEGOTIATION = "Renewal Negotiation",
    POLICY_ADMINISTRATION = "Policy Administration"
}
export declare enum BudgetRange {
    KES_50_100K = "KES 50,000 - 100,000",
    KES_100_250K = "KES 100,000 - 250,000",
    KES_250_500K = "KES 250,000 - 500,000",
    KES_500K_1M = "KES 500,000 - 1,000,000",
    KES_1M_PLUS = "KES 1,000,000+"
}
export declare enum NatureOfOutsourcing {
    FULL_OUTSOURCING = "Full outsourcing",
    PARTIAL_OUTSOURCING = "Partial outsourcing",
    ON_DEMAND_SUPPORT = "On-demand support"
}
export declare class OutsourcingRequest {
    id: number;
    organization_name: string;
    core_functions: string;
    location: string;
    address: string;
    email: string;
    services: unknown;
    nature_of_outsourcing: string;
    budget_range: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
