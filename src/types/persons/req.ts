import { AccountAddress } from "../address";
import { BusinessRole } from "../businessRole";
import { AccountDocumentRequest } from "../documents/req";
import { Gender } from "../gender";

export interface CreatePersonRequest {
    firstName: string;
    middleNames?: string | null | undefined;
    lastName: string;
    email: string;
    dateOfBirth: string;
    countryOfBirth?: string | null | undefined;
    gender: Gender;
    nationalities: string[];
    address: AccountAddress;
    phoneNumber: string;
    businessRoles: BusinessRole[];
    documents: AccountDocumentRequest[];
    metadata?: Record<string, string> | null | undefined;
}

export interface UpdatePersonRequest {
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
    businessRoles?: BusinessRole[] | null | undefined;
    documents?: AccountDocumentRequest[] | null | undefined;
    metadata?: Record<string, string> | null | undefined;
}
