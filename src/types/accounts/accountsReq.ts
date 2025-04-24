import { AccountAddress } from "../address";
import { Gender } from "../gender";

export interface CreateSubAccountRequest {
    onboardingFlow?: string | null | undefined;
    email?: string | null | undefined;
    entityType?: string | null | undefined;
    business?: CreateBusinessRequest | null | undefined;
    individual?: CreateIndividualRequest | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    settings?: AccountSettingsRequest | null | undefined;
    termsOfService?: AccountTermsOfServiceRequest | null | undefined;
}

export interface CreateBusinessRequest {
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
    documents?: AccountDocumentRequest[] | null | undefined;
}

interface CreateIndividualRequest {
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
    documents?: AccountDocumentRequest[] | null | undefined;
}

export interface AccountSettingsRequest {
    payouts: {
        schedule: {
            type: string;
        }
    }
}

export interface AccountTermsOfServiceRequest {
    acceptance: {
        ipAddress: string;
        userAgent?: string | null | undefined;
        when?: number | null | undefined;
    }
}

export interface UpdateSubAccountRequest {
    entityType?: string | null | undefined;
    business?: UpdateBusinessRequest | null | undefined;
    individual?: UpdateIndividualRequest | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    settings?: AccountSettingsRequest | null | undefined;
    termsOfService?: AccountTermsOfServiceRequest | null | undefined;
}

export interface UpdateBusinessRequest {
    name?: string | null | undefined;
    type: string;
    registrationNumber?: string | null | undefined;
    registrationDate?: string | null | undefined;
    registeredAddress?: AccountAddress | null | undefined;
    contactEmail?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    tradingName?: string | null | undefined;
    tradingAddress?: AccountAddress | null | undefined;
    tradingCountries?: string[] | null | undefined;
    websiteUrl?: string | null | undefined;
    documents?: AccountDocumentRequest[] | null | undefined;
}

interface UpdateIndividualRequest {
    firstName?: string | null | undefined;
    middleNames?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    dateOfBirth?: string | null | undefined;
    countryOfBirth?: string | null | undefined;
    gender?: Gender | null | undefined;
    nationalities?: string[] | null | undefined;
    address?: AccountAddress | null | undefined;
    phoneNumber?: string | null | undefined;
    documents?: AccountDocumentRequest[] | null | undefined;
}

export interface AccountDocumentRequest {
    type: string;
    front: string;
    back?: string | null | undefined;
    country?: string | null | undefined;
}
