export const mockCapturePaymentRequest_WithPartialAmount = {
    "amount": 50
}

export const mockCapturePaymentRequest_WithMultiCaptureNonFinal = {
    "amount": 50,
    "captureType": "NonFinal"
}

export const mockCapturePaymentRequest_SplitPayments = {
    "splits": {
        "items": [
            {
                "accountId": "ac_3fe8398f-8cdb-43a3-9be2-806c4f84c327",
                "amount": 50,
                "fee": {
                    "amount": 5
                },
                "metadata": {
                    "productId": "123"
                }
            },
            {
                "accountId": "ac_b83f2653-06d7-44a9-a548-5825e8186004",
                "amount": 250,
                "description": "2x The Big Gundown",
                "fee": {
                    "amount": 20
                },
                "metadata": {
                    "productId": "321"
                }
            }
        ]
    }
}
