import { NatureOfOutsourcing } from '../entities/outsourcing_request.entity';
import { BudgetRange } from '../entities/outsourcing_request.entity';
export declare class CreateOutsourcingRequestDto {
    organization_name: string;
    core_functions: string;
    location: string;
    address: string;
    email: string;
    services: string[];
    nature_of_outsourcing: NatureOfOutsourcing;
    budget_range: BudgetRange;
}
