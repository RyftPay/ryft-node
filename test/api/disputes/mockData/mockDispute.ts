export const mockDispute = {
    id: "dsp_01G0EYVFR02KBBVE2YWQ8AKMGJ",
    amount: 500,
    currency: "GBP",
    status: "Open",
    category: "Fraudulent",
    reason: {
        code: "13.6",
        description: "Merchandise/Services Not Received"
    },
    respondBy: 1685059200,
    recommendedEvidence: [
        "ProofOfDelivery"
    ],
    paymentSession: {
        id: "ps_01G0EYVFR02KBBVE2YWQ8AKMGJ",
        paymentType: "Standard",
        paymentMethod: {
            card: {
                scheme: "Mastercard",
                last4: "4444"
            }
        }
    },
    evidence: {
        text: {
            billingAddress: "string",
            shippingAddress: "string",
            duplicateTransaction: "string",
            uncategorised: "string"
        },
        files: {
            proofOfDelivery: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            customerSignature: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            receipt: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            shippingConfirmation: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            customerCommunication: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            refundPolicy: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            recurringPaymentAgreement: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            },
            uncategorised: {
                id: "fl_01G0EYVFR02KBBVE2YWQ8AKMGJ"
            }
        }
    },
    customer: {
        email: "john.doe@ryftpay.com",
        id: "cus_01G0EYVFR02KBBVE2YWQ8AKMGJ",
        createdTimestamp: 1470989538
    },
    subAccount: {
        id: "ac_3fe8398f-8cdb-43a3-9be2-806c4f84c327"
    },
    createdTimestamp: 1470989538,
    lastUpdatedTimestamp: 1470989538
}