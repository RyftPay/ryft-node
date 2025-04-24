export const mockCreatePayoutMethodRequest_GBPBankAccount = {
    "type": "BankAccount",
    "currency": "GBP",
    "country": "GB",
    "bankAccount": {
        "bankIdType": "SortCode",
        "bankId": "123456",
        "accountNumberType": "UnitedKingdom",
        "accountNumber": "12345678",
        "address": {
            "lineOne": "123 Street",
            "city": "Manchester",
            "country": "GB",
            "postalCode": "M1 1AA"
        }
    }
}

export const mockCreatePayoutMethodRequest_EURBankAccount = {
    "type": "BankAccount",
    "currency": "EUR",
    "country": "IE",
    "bankAccount": {
        "accountNumberType": "Iban",
        "accountNumber": "IE64IRCE92050112345678",
        "address": {
            "lineOne": "123 Street",
            "city": "Dublin",
            "country": "IE",
            "postalCode": "DO1 1AA"
        }
    }
}

export const mockCreatePayoutMethodRequest_USDBankAccount = {
    "type": "BankAccount",
    "currency": "USD",
    "country": "US",
    "bankAccount": {
        "bankIdType": "RoutingNumber",
        "bankId": "026014928",
        "accountNumberType": "UnitedStates",
        "accountNumber": "253368194864",
        "address": {
            "lineOne": "123 Street",
            "city": "Beverly Hills",
            "country": "US",
            "postalCode": "90210",
            "region": "CA"
        }
    }
}
