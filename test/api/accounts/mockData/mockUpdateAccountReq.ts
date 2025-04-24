import { Gender } from "../../../../src/types/gender";

export const mockUpdateAccountRequest = {
    "entityType": "Business",
    "business": {
        "name": "string",
        "type": "Corporation",
        "registrationNumber": "12345678",
        "registrationDate": "1990-01-20",
        "registeredAddress": {
            "lineOne": "string",
            "lineTwo": "string",
            "city": "string",
            "country": "GB",
            "postalCode": "string",
            "region": "string"
        },
        "contactEmail": "contact@test.com",
        "phoneNumber": "+447900000000",
        "tradingName": "string",
        "tradingAddress": {
            "lineOne": "string",
            "lineTwo": "string",
            "city": "string",
            "country": "GB",
            "postalCode": "string",
            "region": "string"
        },
        "tradingCountries": [
            "GB"
        ],
        "websiteUrl": "https://www.example.com",
        "documents": [
            {
                "type": "BankStatement",
                "front": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                "back": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                "country": "GB"
            }
        ]
    },
    "individual": {
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
        "documents": [
            {
                "type": "BankStatement",
                "front": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                "back": "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                "country": "GB"
            }
        ]
    },
    "metadata": {
        "accountId": "1"
    },
    "settings": {
        "payouts": {
            "schedule": {
                "type": "Automatic"
            }
        }
    },
    "termsOfService": {
        "acceptance": {
            "ipAddress": "127.0.0.1",
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            "when": 1697557453
        }
    },
    "capabilities": {
        "amexPayments": {
            "requested": true
        }
    }
}
