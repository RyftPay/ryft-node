import { Address } from "../address";
import { ShippingDetails } from "../shippingDetails";

export interface CreatePaymentSessionRequest {
    amount: number;
    currency: string;
    customerEmail?: string;
    customerDetails?: {
        id?: string;
        firstName?: string;
        lastName?: string;
        homePhoneNumber?: string;
        mobilePhoneNumber?: string;
        metadata?: Record<string, string>;
    };
    platformFeee?: number;
    splits?: SplitPaymentRequest;
    captureFlow?: string;
    paymentType: string;
    entryMode?: string;
    previousPayment?: {
        id: string;
    };
    rebillingDetail?: {
        amountVeriance?: string;
        numberOfDaysBetweenPayments: number;
        totalNumberOfPayments?: number;
        currentPaymentNumber?: number;
        expiry?: number;
    };
    verifyAccount?: boolean;
    shippingDetails?: ShippingDetails;
    orderDetails?: OrderDetailsRequest;
    statementDescriptor?: {
        descriptor: string;
        city: string;
    };
    metadata?: Record<string, string>;
    returnUrl?: string;
    attemptPayment?: CreatePaymentSessionAttemptPaymentRequest;
    paymentSettings?: PaymentSettingsRequest;
}

export interface UpdatePaymentSessionRequest {
    amount?: number;
    customerEmail?: string;
    platformFee?: number;
    splits?: SplitPaymentRequest;
    metadata?: Record<string, string>;
    captureFlow?: string;
    shippingDetails?: ShippingDetails;
    orderDetails?: OrderDetailsRequest;
    paymentSettings?: PaymentSettingsRequest;
}

export interface AttemptPaymentSessionRequest {
    clientSecret: string;
    paymentMethodType?: string;
    cardDetails?: {
        number: string;
        expiryMonth: string;
        expiryYear: string;
        cvc: string;
        name?: string;
    };
    walletDetails?: {
        type: string;
        googlePayToken?: string;
        applePayToken?: string;
    };
    paymentMethod?: {
        id: string;
        cvc?: string;
    };
    paymentMethodOptions?: {
        store: boolean;
    };
    billingAddress?: Address;
    customerDetails?: {
        email: string;
        homePhoneNumber?: string;
        mobilePhoneNumber?: string;
    };
    threeDsRequestDetails?: {
        deviceChannel: string;
        browserDetails?: {
            acceptHeader: string;
            colorDepth: number;
            javaEnabled: boolean;
            language: string;
            screenHeight: number;
            screenWidth: number;
            timeZoneOffset: number;
            userAgent: string;
        }
    }
}

export interface ContinuePaymentSessionRequest {
    clientSecret: string;
    threeDs: {
        fingerprint?: string;
        challengeResult?: string;
    };
}

export interface SplitPaymentRequest {
    items: {
        id?: string | null | undefined;
        accountId?: string | null | undefined;
        amount?: number | null | undefined;
        description?: string | null | undefined;
        fee?: {
            amount: number;
        } | null | undefined;
        metadata?: Record<string, string>;
    }[];
}

export interface OrderDetailsRequest {
    items: {
        reference: string;
        name: string;
        quantity: number;
        unitPrice: number;
        taxAmount: number;
        totalAmount: number;
        discountAmount?: number;
        productUrl?: string;
        imageUrl?: string;
    }[];
}

export interface PaymentSettingsRequest {
    paymentMethodOptions: {
        disabled: string[];
    }
}

export interface CreatePaymentSessionAttemptPaymentRequest {
    paymentMethod: {
        id: string;
        cvc?: string;
    };
}
