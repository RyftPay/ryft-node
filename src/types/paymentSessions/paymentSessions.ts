import { Address } from "../address";
import { ShippingDetails } from "../shippingDetails";

export interface PaymentSessions {
    items: PaymentSession[];
    paginationToken?: string;
}

export interface PaymentSession {
    id: string;
    amount: number;
    currency: string;
    paymentType?: string | null | undefined;
    entryMode?: string | null | undefined;
    customerEmail?: string | null | undefined;
    customerDetails?: CustomerDetails | null | undefined;
    credentialOnFileUsage?: {
        initiator: string;
        sequence: string;
    } | null | undefined;
    previousPayment?: {
        id: string;
    } | null | undefined;
    rebillingDetail?: RebillingDetail | null | undefined;
    enabledPaymentMethods: string[];
    paymentMethod?: PaymentSessionPaymentMethod | null | undefined;
    platformFee?: number | null | undefined;
    splitPaymentDetail: SplitPaymentDetails;
    status: string;
    metadata?: Record<string, string> | null | undefined;
    clientSecret: string;
    lastError?: string | null | undefined;
    refundedAmount: number;
    statementDescriptor: {
        descriptor: string;
        city: string;
    };
    requiredAction?: RequiredAction | null | undefined;
    returnUrl: string;
    authorizationType?: string | null | undefined;
    captureFlow?: string | null | undefined;
    verifyAccount?: boolean | null | undefined;
    shippingDetails?: ShippingDetails | null | undefined;
    orderDetails?: OrderDetails | null | undefined;
    paymentSettings?: {
        paymentMethodOptions: {
            disabled: string[];
        };
    } | null | undefined;
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
}

export interface PaymentSessionPaymentMethod {
    type: string;
    tokenizedDetails?: {
        id: string;
        stored: boolean;
    };
    card?: {
        scheme: string;
        last4: string;
    };
    wallet: {
        type: string;
    };
    billingAddress?: Address;
    checks?: {
        avsResponseCode?: string;
        cvvResponseCode?: string;
    };
}

export interface OrderDetails {
    items: OrderDetail[];
}

export interface OrderDetail {
    reference: string;
    name: string
    quantity: number;
    unitPrice: number;
    taxAmount: number;
    totalAmount: number;
    discountAmount: number;
    productUrl?: string;
    imageUrl?: string;
}

export interface RequiredAction {
    type: string;
    url?: string;
    identify: {
        uniqueId?: string;
        threeDsMethodUrl: string;
        threeDsMethodSignature: string;
        sessionId: string;
        sessionSecret: string;
        threeDsMethodData: string;
        scheme: string;
        paymentMethodId: string;
    };
}

export interface CustomerDetails {
    id?: string;
    firstName?: string;
    lastName?: string;
    homePhoneNumber?: string;
    mobilePhoneNumber?: string;
    metadata?: Record<string, string>;
}

export interface SplitPaymentDetails {
    items: SplitPaymentDetail[];
}

export interface SplitPaymentDetail {
    id: string;
    accountId: string;
    amount: number;
    fee?: {
        amount: number;
    } | null | undefined;
    description: string;
    metadata?: Record<string, string> | null | undefined;
}

export interface RebillingDetail {
    amountVariance: string;
    numberOfDaysBetweenPayments: number;
    totalNumberOfPayments?: number;
    currentPaymentNumber?: number
    expiry?: number;
}
