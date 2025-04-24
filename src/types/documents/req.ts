import { AccountDocumentType } from "./documentType";

export interface AccountDocumentRequest {
    type: AccountDocumentType;

    /**
     * The ID of the uploaded file that shows the front of the document
     */
    front: string;

    /**
     * The ID of the uploaded file that shows the back of the document.
     * Required for `DriversLicense` or `NationalId`before verification can be completed.
     */
    back?: string | null | undefined;

    /**
     * The two-character ISO 3166 country code of the document. 
     * Only required when the document has type: `Passport`, `DriversLicense`, `NationalId`
     */
    country?: string | null | undefined;
}
