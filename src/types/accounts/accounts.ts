import { AccountAddress } from "../address";
import { Gender } from "../gender";

export interface AccountAuthorization {
    createdTimestamp: number;
    expiresTimestamp: number;
    url: string;
}

export interface SubAccount {
    id: string;
    type: string
    frozen: boolean;
    email?: string | null | undefined;
    onboardingFlow: string;
    entityType: string;
    business?: AccountBusiness | null | undefined;
    individual?: AccountIndividual | null | undefined;
    verification: AccountVerification;
    metadata?: Record<string, string> | null | undefined;
    settings: AccountSettings;
    capabilities: AccountCapabilities;
    termsOfService?: AccountTermsOfService | null | undefined;
    createdTimestamp: number;
}

export interface AccountBusiness {
    name: string;
    type: string;
    registrationNumber: string;
    registrationDate?: string | null | undefined;
    registeredAddress: AccountAddress;
    contactEmail: string;
    phoneNumber?: string | null | undefined;
    tradingName?: string | null | undefined;
    tradingAddress?: AccountAddress | null | undefined;
    tradingCountries?: string[] | null | undefined;
    websiteUrl?: string | null | undefined;
    documents: AccountDocument[];
}

export interface AccountIndividual {
    firstName: string;
    middleNames?: string | null | undefined;
    lastName: string;
    email: string;
    dateOfBirth: string;
    countryOfBirth?: string | null | undefined;
    gender: Gender;
    nationalities: string[];
    address: AccountAddress;
    phoneNumber?: string | null | undefined;
    documents: AccountDocument[];
}

export interface AccountDocument {
    type: string;
    front: string;
    back?: string | null | undefined;
    status: string;
    invalidReason?: string | null | undefined;
    country?: string | null | undefined;
    assignedTimestamp: number;
    lastUpdatedTimestamp: number;
}

export interface AccountVerification {
    status: string;
    requiredFields: Array<{
        name: string;
    }>;
    requiredDocuments: Array<{
        category: string;
        types: string[];
        quantity: number;
    }>;
    errors: Array<{
        id: string;
        code: string;
        description: string;
    }>
    persons: Array<{
        status: string;
        required: Array<{
            role: string;
            quantity: number;
        }>;
    }>;
}

export interface AccountSettings {
    payouts: {
        schedule: {
            type: string;
        }
    }
}

export interface AccountCapabilities {
    visaPayments: AccountCapability;
    mastercardPayments: AccountCapability;
    amexPayments: AccountCapability;
}

export interface AccountCapability {
    status: string;
    requested: boolean;
    requiredFields: Array<{
        name: string;
    }>
    disabledReason?: string | null | undefined;
    requestedTimestamp: number;
    lastUpdatedTimestamp: number;
}

export interface AccountTermsOfService {
    acceptance: {
        ipAddress: string;
        userAgent?: string | null | undefined;
        when: number;
    }
}
