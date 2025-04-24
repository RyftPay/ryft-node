export interface Transfers {
    items: Transfer[];
    paginationToken?: string | null | undefined;
}

export interface Transfer {
    id: string;
    status: string;
    amount: number;
    currency: string;
    reason?: string | null | undefined;
    source?: {
        accountId: string
    } | null | undefined;
    destination?: {
        accountId: string;
    } | null | undefined;
    errors?: Array<{
        code: string
        description: string
    }> | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    createdTimestamp: number
    lastUpdatedTimestamp: number
}
