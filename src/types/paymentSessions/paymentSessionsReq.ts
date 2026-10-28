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
    platformFee?: number;
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
    /**
     * The result of 3DS performed with your own 3DS server (MPI), or the cryptogram for
     * `attemptPayment.walletNetworkToken`. Only used with `attemptPayment`.
     */
    authenticationParameters?: AuthenticationParametersRequest;
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
        cvc?: string;
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
    };
    /**
     * An Apple Pay or Google Pay network token you have decrypted yourself.
     * Requires your secret key and `authenticationParameters`.
     */
    walletNetworkToken?: WalletNetworkTokenRequest;
    /**
     * The result of 3DS performed with your own 3DS server (MPI), or the cryptogram for
     * `walletNetworkToken`. Can only be sent with your secret key, it is rejected with your public key.
     */
    authenticationParameters?: AuthenticationParametersRequest;
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
    paymentMethodOptions?: {
        disabled: string[];
    };
    threeDs?: {
        challengeIndicator?: string;
        policy?: string;
    };
}

export interface CreatePaymentSessionAttemptPaymentRequest {
    paymentMethod?: {
        id: string;
        cvc?: string;
    };
    /**
     * An Apple Pay or Google Pay network token you have decrypted yourself.
     * Requires top-level `authenticationParameters`. Cannot be sent with `paymentMethod`.
     */
    walletNetworkToken?: WalletNetworkTokenRequest;
}

export interface AuthenticationParametersRequest {
    /**
     * The Electronic Commerce Indicator. One of `00`, `01`, `02`, `05`, `06`, `07`, `N0` or `N2`.
     * Required with card details or a stored card. Optional with `walletNetworkToken`,
     * where it is the wallet ECI when the wallet provides one.
     */
    eci?: string;

    /**
     * The base64 encoded authentication value. With card details, required unless `eci` is `00`, `07` or `N0`.
     * Always required with `walletNetworkToken`, where it is the wallet cryptogram.
     */
    authenticationValue?: string;

    /**
     * The 3DS protocol version, `2.1.0` or `2.2.0`. With card details, required unless `eci` is `00`, `07` or `N0`.
     * Optional with `walletNetworkToken`.
     */
    protocolVersion?: string;

    /**
     * The 3DS server transaction ID (UUID).
     */
    threeDsServerTransactionId?: string;

    /**
     * The ACS transaction ID (UUID).
     */
    acsTransactionId?: string;

    /**
     * The directory server transaction ID (UUID). With card details, required unless `eci` is `00`, `07` or `N0`.
     * Optional with `walletNetworkToken`.
     */
    dsTransactionId?: string;
}

/**
 * A decrypted Apple Pay or Google Pay network token.
 * A Google Pay `PAN_ONLY` token decrypts to a card number, not a network token, so it must be sent as `cardDetails` instead.
 */
export interface WalletNetworkTokenRequest {
    /**
     * The device or network token number (DPAN).
     */
    number: string;

    /**
     * The expiry month in `MM` format.
     */
    expiryMonth: string;

    /**
     * The expiry year in `YYYY` format.
     */
    expiryYear: string;

    /**
     * The cardholder name.
     */
    name?: string;

    /**
     * The wallet the token came from.
     */
    walletType: "ApplePay" | "GooglePay";
}
