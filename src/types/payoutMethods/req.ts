import { AccountAddress } from "../address";

export interface CreatePayoutMethodRequest {
    type: string;
    displayName?: string | null | undefined;
    currency: string;
    country: string;
    bankAccount: BankAccountRequest;
    default?: boolean | null | undefined;
}

export interface UpdatePayoutMethodRequest {
    displayName?: string | null | undefined;
    bankAccount: BankAccountRequest;
    default?: boolean | null | undefined;
}

export interface BankAccountRequest {
    bankIdType?: string | null | undefined;
    bankId?: string | null | undefined;
    accountNumberType: string;
    accountNumber: string;
    address?: AccountAddress | null | undefined;
}
