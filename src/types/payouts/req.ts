export interface CreatePayoutRequest {
    amount: number;
    currency: string;
    payoutMethodId: string;
    metadata?: Record<string, string> | null | undefined;
}
