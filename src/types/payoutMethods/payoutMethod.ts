import { AccountAddress } from "../address";

export interface PayoutMethods {
    items: PayoutMethod[];
    paginationToken?: string;
}

export interface PayoutMethod {
    id: string;
    type: string;
    displayName?: string | null | undefined;
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
}
