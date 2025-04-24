import { Address } from "../address";
import { Checks } from "../paymentMethods/paymentMethods";
import { ShippingDetails } from "../shippingDetails";

export interface PaymentSessions {
    items: PaymentSession[];
    paginationToken?: string | null | undefined;
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
        id: string
    } | null | undefined;
    rebillingDetail?: RebillingDetail | null | undefined;
    enabledPaymentMethods: string[];
    paymentMethod?: SessionPaymentMethod | null | undefined;
    platformFee?: number | null | undefined;
    splitPaymentDetail: SplitPaymentDetail
    status: string
    metadata?: Record<string, string> | null | undefined;
    clientSecret: string;
    lastError?: string | null | undefined;
    refundedAmount: number;
    statementDescriptor: {
        descriptor: string
        city: string
    };
    requiredAction?: {
        type: string
        url: string
    } | null | undefined;
    returnUrl: string;
    authorizationType?: string | null | undefined;
    captureFlow?: string | null | undefined;
    verifyAccount?: boolean | null | undefined;
    shippingDetails?: ShippingDetails | null | undefined;
    orderDetails?: OrderDetails | null | undefined;
    paymentSettings?: {
        paymentMethodOptions: {
            disabled: string[]
        }
    } | null | undefined;
    createdTimestamp: number
    lastUpdatedTimestamp: number
}

export interface CustomerDetails {
    id?: string | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    homePhoneNumber?: string | null | undefined;
    mobilePhoneNumber?: string | null | undefined;
    metadata?: Record<string, string> | null | undefined;
}

export interface RebillingDetail {
    amountVariance: string;
    numberOfDaysBetweenPayments: number;
    totalNumberOfPayments?: number | null | undefined;
    currentPaymentNumber?: number | null | undefined;
    expiry?: number | null | undefined;
}

export interface SessionPaymentMethod {
    type: string
    tokenizedDetails?: {
        id: string;
        stored: boolean;
    } | null | undefined;
    card?: {
        scheme: string;
        last4: string;
    } | null | undefined;
    wallet?: {
        type: string;
    } | null | undefined;
    billingAddress?: Address | null | undefined;
    checks?: Checks | null | undefined;
}

export interface SplitPaymentDetail {
    items: {
        id: string
        accountId: string
        amount: number
        fee: {
            amount: number
        }
        description: string
        metadata?: Record<string, string> | null | undefined
    }[]
}

export interface OrderDetails {
    items: {
        reference: string
        name: string
        quantity: number
        unitPrice: number
        taxAmount: number
        totalAmount: number
        discountAmount: number
        productUrl: string
        imageUrl: string
    }[]
}
