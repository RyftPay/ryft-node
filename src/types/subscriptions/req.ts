import { ShippingDetails } from "../shippingDetails";

export interface CreateSubscriptionRequest {
    customer: {
        id: string;
    };
    price: SubscriptionPriceRequest;
    paymentMethod: {
        id: string;
    }
    description?: string | null | undefined;
    billingCycleTimestamp?: number | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    shippingDetails?: ShippingDetails | null | undefined;
    paymentSettings?: PaymentSettingsRequest | null | undefined;
}

export interface UpdateSubscriptionRequest {
    price?: SubscriptionUpdatePriceRequest | null | undefined;
    paymentMethod?: {
        id: string;
    } | null | undefined;
    description?: string | null | undefined;
    billingCycleTimestamp?: number | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    shippingDetails?: ShippingDetails | null | undefined;
    paymentSettings?: PaymentSettingsRequest | null | undefined;
}


export interface SubscriptionPriceRequest {
    amount: number;
    currency: string;
    interval: SubscriptionIntervalRequest;
}

export interface SubscriptionUpdatePriceRequest {
    amount: number;
    interval?: SubscriptionIntervalRequest | null | undefined;
}

export interface SubscriptionIntervalRequest {
    unit: string;
    count: number;
    times?: number | null | undefined;
}

export interface PaymentSettingsRequest {
    statementDescriptor: {
        descriptor: string;
        city: string
    }
}

export interface PauseSubscriptionRequest {
    reason?: string | null | undefined;
    resumeTimestamp?: number | null | undefined;
    unschedule?: boolean | null | undefined;
}
