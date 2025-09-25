export interface UploadedDocument {
    original_name: string;
    size: number;
    path: string;
    mime_type: string;
    public_id: string;
    bytes?: number;
    asset_id?: string;
    format?: string;
    resource_type?: string;
}
export declare class CloudinaryService {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<UploadedDocument>;
    uploadFiles(files: Express.Multer.File[]): Promise<UploadedDocument[]>;
    deleteFile(publicId: string): Promise<{
        result: string;
    }>;
}
