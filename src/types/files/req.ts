export interface CreateFileRequest {
    file: string;
    category: string;
    metadata?: string[] | null | undefined;
}
