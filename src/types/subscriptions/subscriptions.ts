import { RequiredAction } from "../paymentSessions/paymentSessions";
import { RecurringPrice } from "../recurringPrice";
import { ShippingDetails } from "../shippingDetails";

export interface Subscriptions {
    items: Subscription[];
    paginationToken: string;
}

export interface Subscription {
    id: string;
    status: string;
    description?: string | null | undefined;
    customer: {
        id: string;
    };
    paymentMethod: {
        id: string;
    };
    paymentSessions: {
        initial: SubscriptionPaymentSession;
        latest: SubscriptionPaymentSession;
    };
    price: RecurringPrice;
    balance: SubscriptionBalance;
    pausePaymentDetail?: SubscriptionPausePaymentDetail | null | undefined;
    cancelDetail?: SubscriptionCancelDetail | null | undefined;
    billingDetail: SubscriptionBillingDetail;
    shippingDetails?: ShippingDetails | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    paymentSettings: SubscriptionPaymentSettings;
    createdTimestamp: number;
}

export interface SubscriptionPaymentSession {
    id: string;
    clientSecret?: string | null | undefined;
    requiredActions?: RequiredAction | null | undefined;
}

export interface SubscriptionPausePaymentDetail {
    reason?: string | null | undefined;
    resumeAtTimestamp?: number | null | undefined;
    pausedAtTimestamp: number;
}

export interface SubscriptionCancelDetail {
    reason?: string | null | undefined;
    cancelledAtTimestamp: number;
}

export interface SubscriptionBalance {
    amount: number;
}

export interface SubscriptionBillingDetail {
    totalCycles: number;
    currentCycle: number;
    currentCycleStartTimestamp: number;
    currentCycleEndTimestamp: number;
    billingCycleTimestamp: number;
    nextBillingTimestamp?: number | null | undefined;
    failureDetail?: SubscriptionFailureDetail | null | undefined;
}

export interface SubscriptionFailureDetail {
    paymentAttempts: number;
    lastPaymentError: string;
}

export interface SubscriptionPaymentSettings {
    statementDescriptor?: {
        descriptor: string;
        city: string;
    } | null | undefined;
}
