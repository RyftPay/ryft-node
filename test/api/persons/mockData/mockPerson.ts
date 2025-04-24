export const mockPerson = {
    "id": "per_01G0EYVFR02KBBVE2YWQ8AKMGJ",
    "firstName": "Fred",
    "middleNames": "David",
    "lastName": "Jones",
    "email": "fred.jones@example.com",
    "dateOfBirth": "1990-01-20",
    "countryOfBirth": "GB",
    "gender": "Male",
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
    "phoneNumber": "string",
    "businessRoles": [
        "BusinessContact",
        "Director"
    ],
    "verification": {
        "status": "Required",
        "requiredFields": [
            {
                "name": "string"
            }
        ],
        "requiredDocuments": [
            {
                "category": "ProofOfIdentity",
                "types": [
                    "BankStatement"
                ],
                "quantity": 1
            }
        ],
        "errors": [
            {
                "code": "InvalidDocument",
                "id": "string",
                "description": "string"
            }
        ]
    },
    "documents": [
        {
            "type": "BankStatement",
            "category": "ProofOfIdentity",
            "front": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            "back": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            "status": "Pending",
            "invalidReason": "Document has expired",
            "country": "GB",
            "assignedTimestamp": 1470989538,
            "lastUpdatedTimestamp": 1470989538
        }
    ],
    "metadata": {
        "accountId": "1"
    },
    "createdTimestamp": 1470989538,
    "lastUpdatedTimestamp": 1470989538
} 
