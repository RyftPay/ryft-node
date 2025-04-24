export interface Events {
    items: Event[];
}

export interface Event {
    id: string;
    eventType: string;
    data: EventData;
    endpoints: Endpoint[];
    accountId?: string | null | undefined;
    createdTimestamp: number;
}

export interface EventData {
    id: string;
    accountId?: string | null | undefined;
    paymentTransactionId?: string | null | string;
    amount?: number | null | undefined;
    platformFee?: number | null | string;
    currency?: string | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    status?: string | null | undefined;
    email?: string | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    defaultPaymentMethod?: string | null | undefined;
    customer?: {
        id?: string | null | undefined;
    } | null | undefined;
    paymentMethod: {
        tokenizedDetails: PaymentMethodTokenizedDetails;
    };
    createdTimestamp: number;
}

export interface PaymentMethodTokenizedDetails {
    id: string;
    stored: boolean;
}

export interface PausePaymentDetail {
    reason?: string | null | undefined;
    resumeAtTimestamp?: number | null | undefined;
    pausedAtTimestamp: number;
}

export interface Endpoint {
    webhookId: string;
    acknowledged: boolean;
    attempts: number;
}
