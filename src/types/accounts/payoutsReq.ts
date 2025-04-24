export interface CreateManualPayoutRequest {
    amount: number;
    currency: string;
    payoutMethodId: string;
    metadata?: Record<string, string> | null | undefined;
}
