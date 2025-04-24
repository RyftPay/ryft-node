import { BusinessRole } from "../../../../src/types/businessRole";
import { AccountDocumentType } from "../../../../src/types/documents/documentType";
import { Gender } from "../../../../src/types/gender";

export const mockUpdatePersonRequest = {
    "firstName": "Fred",
    "middleNames": "David",
    "lastName": "Jones",
    "email": "fred.jones@example.com",
    "dateOfBirth": "1990-01-20",
    "countryOfBirth": "GB",
    "gender": "Male" as Gender,
    "nationalities": [
        "GB"
    ],
    "address": {
        "lineOne": "string",
        "lineTwo": "string",
        "city": "string",
        "country": "GB",
        "postalCode": "string",
        "region": "string"
    },
    "phoneNumber": "+447900000000",
    "businessRoles": [
        "BusinessContact",
        "Director"
    ] as BusinessRole[],
    "documents": [
        {
            "type": "BankStatement" as AccountDocumentType,
            "front": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            "back": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            "country": "GB"
        }
    ],
    "metadata": {
        "accountId": "1"
    }
}
