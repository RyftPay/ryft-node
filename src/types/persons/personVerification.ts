import { AccountDocumentCategory } from "../documents/documentCategory";
import { AccountDocumentType } from "../documents/documentType";
import { VerificationError } from "./verificationError";

export type VerificationStatus =
    "NotRequired" |
    "Required" |
    "PendingVerification" |
    "Verified"

export interface VerificationRequiredField {
    name: string;
}

export interface VerificationRequiredDocuments {
    category: AccountDocumentCategory;
    types: AccountDocumentType[];
    quantity: number;
}

export interface PersonVerification {
    status: VerificationStatus;
    requiredFields: VerificationRequiredField[];
    requiredDocuments: VerificationRequiredDocuments;
    errors?: VerificationError[] | null | undefined;
}
