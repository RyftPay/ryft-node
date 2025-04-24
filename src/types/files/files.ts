export interface Files {
    items: File[];
    paginationToken?: string | null | undefined;
}

export interface File {
    id: string;
    name: string;
    type: string;
    category: string;
    metadata?: Record<string, string> | null | undefined;
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
    sizeInBytes?: number | null | undefined;
}
