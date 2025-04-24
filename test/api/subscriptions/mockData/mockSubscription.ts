export const mockSubscription = {
    id: "sub_01G0EYVFR02KBBVE2YWQ8AKMGJ",
    status: "Pending",
    description: "Bob's monthly gym membership",
    customer: {
        id: "cus_01G0EYVFR02KBBVE2YWQ8AKMGJ"
    },
    paymentMethod: {
        id: "pmt_01G0EYVFR02KBBVE2YWQ8AKMGJ"
    },
    paymentSessions: {
        initial: {
            id: "ps_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            clientSecret: "ps_01FCTS1XMKH9FF43CAFA4CXT3P_secret_b83f2653-06d7-44a9-a548-5825e8186004",
            requiredAction: {
                type: "Redirect",
                url: "https://ryftpay.com/3ds-auth"
            }
        },
        latest: {
            id: "ps_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            clientSecret: "ps_01FCTS1XMKH9FF43CAFA4CXT3P_secret_b83f2653-06d7-44a9-a548-5825e8186004",
            requiredAction: {
                type: "Redirect",
                url: "https://ryftpay.com/3ds-auth"
            }
        }
    },
    price: {
        amount: 5000,
        currency: "GBP",
        interval: {
            unit: "Months",
            count: 1,
            times: 12
        }
    },
    balance: {
        amount: 5000
    },
    pausePaymentDetail: {
        reason: "Offering service for free to customer",
        resumeAtTimestamp: 1470989538,
        pausedAtTimestamp: 1470989538
    },
    cancelDetail: {
        reason: "Customer no longer wants to use the service",
        cancelledAtTimestamp: 1480989538
    },
    billingDetail: {
        totalCycles: 12,
        currentCycle: 4,
        currentCycleStartTimestamp: 1480989538,
        currentCycleEndTimestamp: 1480989538,
        billingCycleTimestamp: 1480989538,
        nextBillingTimestamp: 1480989538,
        failureDetail: {
            paymentAttempts: 2,
            lastPaymentError: "insufficient_funds"
        }
    },
    shippingDetails: {
        address: {
            firstName: "Fox",
            lastName: "Mulder",
            lineOne: "Stonehenge",
            postalCode: "SP4 7DE",
            city: "Salisbury",
            country: "GB"
        }
    },
    metadata: {
        myCustomerId: "1"
    },
    paymentSettings: {
        statementDescriptor: {
            descriptor: "Ryft Ltd",
            city: "London"
        }
    },
    createdTimestamp: 1470989538
}
