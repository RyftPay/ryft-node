export const mockUpdatePaymentSessionRequest = {
    "amount": 500,
    "customerEmail": "example@mail.com",
    "platformFee": 50,
    "splits": {
        "items": [
            {
                "accountId": "ac_b83f2653-06d7-44a9-a548-5825e8186004",
                "amount": 50,
                "description": "2 x The Selfish Gene",
                "fee": {
                    "amount": 50
                },
                "metadata": {
                    "productId": "123",
                    "productTitle": "The Selfish Gene"
                }
            }
        ]
    },
    "metadata": {
        "orderId": "2"
    },
    "captureFlow": "Automatic",
    "shippingDetails": {
        "address": {
            "firstName": "Fox",
            "lastName": "Mulder",
            "lineOne": "Stonehenge",
            "postalCode": "SP4 7DE",
            "city": "Salisbury",
            "country": "GB"
        }
    },
    "orderDetails": {
        "items": [
            {
                "reference": "product123",
                "name": "The Big Gundown (Blu-ray)",
                "quantity": 2,
                "unitPrice": 250,
                "taxAmount": 50,
                "totalAmount": 540,
                "discountAmount": 10,
                "productUrl": "string",
                "imageUrl": "string"
            }
        ]
    },
    "paymentSettings": {
        "paymentMethodOptions": {
            "disabled": [
                "Amex"
            ]
        }
    }
}
