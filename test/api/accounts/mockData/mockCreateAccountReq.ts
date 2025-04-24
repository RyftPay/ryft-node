import { Gender } from "../../../../src/types/gender"

export const mockCreateAccountRequest_HostedOnboardingMinimum = {
    "email": "test@example.com"
}

export const mockCreateAccountRequest_HostedOnboardingBusiness = {
    "onboardingFlow": "Hosted",
    "entityType": "Business",
    "business": {
        "name": "Test Ltd",
        "type": "PublicCompany",
        "registrationNumber": "12345678",
        "registeredAddress": {
            "lineOne": "123 Street",
            "city": "Manchester",
            "country": "GB",
            "postalCode": "M1 1AA"
        },
        "contactEmail": "contact@test.com"
    }
}

export const mockCreateAccountRequest_HostedOnboardingIndividual = {
    "onboardingFlow": "Hosted",
    "entityType": "Individual",
    "individual": {
        "firstName": "Fred",
        "lastName": "Jones",
        "email": "fred.jones@example.com",
        "dateOfBirth": "1990-01-20",
        "gender": "Male" as Gender,
        "nationalities": [
            "GB"
        ],
        "address": {
            "lineOne": "123 Road",
            "city": "London",
            "country": "GB",
            "postalCode": "SW1 1AA"
        }
    }
}

export const mockCreateAccountRequest_NonHostedOnboardingMinimum = {
    "onboardingFlow": "NonHosted"
}

export const mockCreateAccountRequest_NonHostedOnboardingBusiness = {
    "onboardingFlow": "NonHosted",
    "entityType": "Business",
    "business": {
        "name": "Test Ltd",
        "type": "PublicCompany",
        "registrationNumber": "12345678",
        "registeredAddress": {
            "lineOne": "123 Street",
            "city": "Manchester",
            "country": "GB",
            "postalCode": "M1 1AA"
        },
        "contactEmail": "contact@test.com"
    }
}

export const mockCreateAccountRequest_NonHostedOnboardingIndividual = {
    "onboardingFlow": "NonHosted",
    "entityType": "Individual",
    "individual": {
        "firstName": "Fred",
        "lastName": "Jones",
        "email": "fred.jones@example.com",
        "dateOfBirth": "1990-01-20",
        "gender": "Male" as Gender,
        "nationalities": [
            "GB"
        ],
        "address": {
            "lineOne": "123 Road",
            "city": "London",
            "country": "GB",
            "postalCode": "SW1 1AA"
        }
    }
}
