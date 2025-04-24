export const mockUpdateSubscriptionRequest = {
    price: {
        amount: 5000,
        interval: {
            unit: "Months",
            count: 1,
            times: 12
        }
    },
    paymentMethod: {
        id: "pmt_01FCTS1XMKH9FF43CAFA4CXT3P"
    },
    description: "Bob's monthly gym membership",
    billingCycleTimestamp: 1631703901,
    metadata: {
        orderId: "1",
        customerId: "123"
    },
    shippingDetails: {
        address: {
            firstName: "Fox",
            lastName: "Mulder",
            lineOne: "Stonehenge",
            postalCode: "SP4 7DE",
            city: "Salisbury",
            country: "GB",
            region: "ENGLAND"
        }
    },
    paymentSettings: {
        statementDescriptor: {
            descriptor: "Ryft Ltd",
            city: "London"
        }
    }
}
