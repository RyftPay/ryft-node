export const mockRefundPaymentRequest_PartialRefund = {
    "amount": 250
}

export const mockRefundPaymentRequest_WithReason = {
    "amount": 250,
    "reason": "Returned by customer"
}

export const mockRefundPaymentRequest_RefundMultiCaptureTransaction = {
    "amount": 750,
    "captureTransaction": {
        "id": "txn_01FCTS1XMKH9FF43CAFA4CXT3P_01FCTS1XMKH9FF43CAFA4CXT3P"
    }
}

export const mockRefundPaymentRequest_MarketplaceRefundPlatformFee = {
    "amount": 250,
    "refundPlatformFee": true
}

export const mockRefundPaymentRequest_MarketplaceFullRefundSplitPayment = {
    "splits": {
        "items": [
            {
                "id": "sp_01FCTS1XMKH9FF43CAFA4CXT3P"
            },
            {
                "id": "sp_01FCTS1XMKH9FF43CAFA4CXT4P"
            }
        ]
    }
}

export const mockRefundPaymentRequest_MarketplacePartialRefundSplitPayment = {
    "splits": {
        "items": [
            {
                "id": "sp_01FCTS1XMKH9FF43CAFA4CXT3P",
                "amount": 50
            },
            {
                "id": "sp_01FCTS1XMKH9FF43CAFA4CXT4P",
                "amount": 150,
                "fee": {
                    "amount": 50
                }
            }
        ]
    }
}

