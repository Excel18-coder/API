import { BasedConsultationService } from './based-consultation.service';
import { CreateBasedConsultationDto } from './dto/create-based-consultation.dto';
import { UpdateBasedConsultationDto } from './dto/update-based-consultation.dto';
export declare class BasedConsultationController {
    private readonly basedConsultationService;
    constructor(basedConsultationService: BasedConsultationService);
    create(createBasedConsultationDto: CreateBasedConsultationDto): Promise<{
        message: string | undefined;
        data: import("./entities/based-consultation.entity").BasedConsultation | undefined;
    }>;
    findAll(): Promise<{
        message: string | undefined;
        data: import("./entities/based-consultation.entity").BasedConsultation[] | undefined;
    }>;
    findOne(id: string): Promise<{
        message: string | undefined;
        data: import("./entities/based-consultation.entity").BasedConsultation | undefined;
    }>;
    update(id: string, updateBasedConsultationDto: UpdateBasedConsultationDto): Promise<{
        message: string | undefined;
        data: import("./entities/based-consultation.entity").BasedConsultation | undefined;
    }>;
    remove(id: string): Promise<{
        message: string | undefined;
        data: null | undefined;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<{
        message: string | undefined;
        data: import("./entities/based-consultation.entity").BasedConsultation | undefined;
    }>;
}
