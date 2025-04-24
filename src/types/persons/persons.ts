import { AccountAddress } from "../address";
import { BusinessRole } from "../businessRole";
import { AccountDocumentRequest } from "../documents/req";
import { Gender } from "../gender";
import { PersonVerification } from "./personVerification";

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    dateOfBirth?: string | null | undefined;
    countryOfBirth?: string | null | undefined;
    gender: Gender;
    nationalities: string[];
    address: AccountAddress;
    phoneNumber: string;
    businessRoles: BusinessRole[];
    verification: PersonVerification;
    documents: AccountDocumentRequest[];
    metadata?: Record<string, string> | null | undefined;
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
}

export interface Persons {
    items: Person[];
    paginationToken?: string | null | undefined;
}
