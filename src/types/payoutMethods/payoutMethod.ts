import { AccountAddress } from "../address";

export interface PayoutMethods {
    items: PayoutMethod[];
    paginationToken?: string;
}

export type PayoutMethodVerificationStatus = "Unverified" | "Pending" | "NotSupported" | "Verified" | "Rejected";

export type PayoutMethodVerificationRejectionReason = "NameMismatch" | "CheckUnavailable";

export interface PayoutMethodVerification {
    status: PayoutMethodVerificationStatus;
    nameOnAccount?: string | null | undefined;
    rejectionReason?: PayoutMethodVerificationRejectionReason | null | undefined;
}

export interface PayoutMethod {
    id: string;
    type: string;
    displayName?: string | null | undefined;
    status: string;
    invalidReason?: string | null | undefined;
    currency: string;
    countryCode: string;
    bankAccount: {
        bankIdType: string;
        bankId?: string | null | undefined;
        accountNumberType: string;
        accountNumber: string;
        address?: AccountAddress | null | undefined;
    };
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
    verification: PayoutMethodVerification;
}
