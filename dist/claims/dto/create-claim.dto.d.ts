import { ClaimType } from '../entities/claim.entity';
export declare class CreateClaimDto {
    policy_number: number;
    claim_type: ClaimType;
    incident_date: string;
    estimated_loss: number;
    description: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    supporting_documents: any;
}
