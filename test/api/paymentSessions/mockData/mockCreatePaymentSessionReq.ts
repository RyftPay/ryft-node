export const mockCreatePaymentSessionRequest = {
    amount: 500,
    currency: "GBP",
    customerEmail: "example@mail.com",
    customerDetails: {
        id: "cus_01G0EYVFR02KBBVE2YWQ8AKMGJ",
        firstName: "string",
        lastName: "string",
        homePhoneNumber: "+447900000000",
        mobilePhoneNumber: "+447900000000",
        metadata: {
            customerId: "123"
        }
    },
    platformFee: 50,
    passThroughProcessingFee: false,
    splits: {
        items: [
            {
                accountId: "ac_b83f2653-06d7-44a9-a548-5825e8186004",
                amount: 50,
                description: "2 x The Selfish Gene",
                fee: {
                    amount: 50
                },
                metadata: {
                    productId: "123",
                    productTitle: "The Selfish Gene"
                }
            }
        ]
    },
    captureFlow: "Automatic",
    paymentType: "Standard",
    entryMode: "Online",
    previousPayment: {
        id: "string"
    },
    rebillingDetail: {
        amountVariance: "Fixed",
        numberOfDaysBetweenPayments: 30,
        totalNumberOfPayments: 12,
        currentPaymentNumber: 4,
        expiry: 1776988800
    },
    verifyAccount: true,
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
    orderDetails: {
        items: [
            {
                reference: "product123",
                name: "The Big Gundown (Blu-ray)",
                quantity: 2,
                unitPrice: 250,
                taxAmount: 50,
                totalAmount: 540,
                discountAmount: 10,
                productUrl: "string",
                imageUrl: "string"
            }
        ]
    },
    metadata: {
        orderId: "1",
        customerId: "123"
    },
    statementDescriptor: {
        descriptor: "Ryft Ltd",
        city: "London"
    },
    returnUrl: "https://ryftpay.com/checkout?orderId=123",
    attemptPayment: {
        paymentMethod: {
            id: "pmt_01G0EYVFR02KBBVE2YWQ8AKMGJ",
            cvc: "100"
        }
    },
    paymentSettings: {
        paymentMethodOptions: {
            disabled: [
                "Amex"
            ]
        }
    }
}
