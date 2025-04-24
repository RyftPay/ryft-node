export const mockSubAccount = {
    id: "ac_b83f2653-06d7-44a9-a548-5825e8186004",
    type: "Standard",
    status: "ActionRequired",
    actionsRequired: [
        {
            action: "PayoutDetailsRequired",
            description: "string"
        }
    ],
    frozen: false,
    email: "user@example.com",
    onboardingFlow: "Hosted",
    entityType: "Business",
    business: {
        name: "string",
        type: "Corporation",
        registrationNumber: "12345678",
        registrationDate: "1990-01-20",
        registeredAddress: {
            lineOne: "string",
            lineTwo: "string",
            city: "string",
            country: "GB",
            postalCode: "string",
            region: "string"
        },
        contactEmail: "contact@test.com",
        phoneNumber: "+447900000000",
        tradingName: "string",
        tradingAddress: {
            lineOne: "string",
            lineTwo: "string",
            city: "string",
            country: "GB",
            postalCode: "string",
            region: "string"
        },
        tradingCountries: [
            "GB"
        ],
        websiteUrl: "https://www.example.com",
        documents: [
            {
                type: "BankStatement",
                category: "ProofOfIdentity",
                front: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                back: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                status: "Pending",
                invalidReason: "Document has expired",
                country: "GB",
                assignedTimestamp: 1470989538,
                lastUpdatedTimestamp: 1470989538
            }
        ]
    },
    individual: {
        firstName: "Fred",
        middleNames: "David",
        lastName: "Jones",
        email: "fred.jones@example.com",
        dateOfBirth: "1990-01-20",
        countryOfBirth: "GB",
        gender: "Male",
        nationalities: [
            "GB"
        ],
        address: {
            lineOne: "string",
            lineTwo: "string",
            city: "string",
            country: "GB",
            postalCode: "string",
            region: "string"
        },
        phoneNumber: "+447900000000",
        documents: [
            {
                type: "BankStatement",
                category: "ProofOfIdentity",
                front: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                back: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ",
                status: "Pending",
                invalidReason: "Document has expired",
                country: "GB",
                assignedTimestamp: 1470989538,
                lastUpdatedTimestamp: 1470989538
            }
        ]
    },
    verification: {
        status: "Required",
        requiredFields: [
            {
                name: "string"
            }
        ],
        requiredDocuments: [
            {
                category: "ProofOfIdentity",
                types: [
                    "BankStatement"
                ],
                quantity: 1
            }
        ],
        errors: [
            {
                code: "InvalidDocument",
                id: "string",
                description: "string"
            }
        ],
        persons: {
            status: "Required",
            required: [
                {
                    role: "Director",
                    quantity: 1
                }
            ]
        }
    },
    metadata: {
        accountId: "1"
    },
    settings: {
        payouts: {
            schedule: {
                type: "Automatic"
            }
        }
    },
    capabilities: {
        visaPayments: {
            status: "Enabled",
            requested: true,
            requiredFields: [
                {
                    name: "entityType"
                }
            ],
            disabledReason: "string",
            requestedTimestamp: 1470989538,
            lastUpdatedTimestamp: 1470989538
        },
        mastercardPayments: {
            status: "Enabled",
            requested: true,
            requiredFields: [
                {
                    name: "entityType"
                }
            ],
            disabledReason: "string",
            requestedTimestamp: 1470989538,
            lastUpdatedTimestamp: 1470989538
        },
        amexPayments: {
            status: "Enabled",
            requested: true,
            requiredFields: [
                {
                    name: "entityType"
                }
            ],
            disabledReason: "string",
            requestedTimestamp: 1470989538,
            lastUpdatedTimestamp: 1470989538
        }
    },
    termsOfService: {
        acceptance: {
            ipAddress: "127.0.0.1",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            when: 1697557453
        }
    },
    createdTimestamp: 1470989538
}