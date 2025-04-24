export type PayoutMethodScheme =
    "Ach" |
    "Bacs" |
    "Chaps" |
    "Fps" |
    "Swift" |
    "Sepa" |
    "SepaInstant"

export interface Payouts {
    items: Payout[];
     paginationToken?: string | null | undefined;
}

export interface Payout {
    id: string;
    paymentsTakenDateFrom: string;
    paymentsTakenDateTo: string;
    amount: number;
    currency: string;
    status: string;
    scheduleType: string;
    payoutMethod?: {
        id: string
        bankAccount: {
            bankIdType?: string | null | undefined;
            bankId?: string | null | undefined;
            bankName?: string | null | undefined;
            accountNumberType: string;
            last4: string
        }
    } | null | undefined;
    failureReason?: string | null | undefined;
    payoutCalculation: {
        paymentsCapturedAmount: number;
        paymentsRefundedAmount: number;
        paymentsSplitAmount: number;
        paymentsSplitRefundedAmount: number;
        splitPaymentsAmount: number;
        splitPaymentsRefundedAmount: number;
        platformFeesCollectedAmount: number;
        platformFeesRefundedAmount: number;
        platformFeesPaidAmount: number;
        processingFeesPaidAmount: number;
        chargebacksAmount: number;
        chargebackReversalsAmount: number;
        platformChargebacksAmount: number;
        platformChargebackReversalsAmount: number;
        transferredInAmount: number;
        transferredOutAmount: number;
        payoutAmount: number;
        currency: string;
        numberOfPaymentsCaptured: number;
        numberOfPaymentsRefunded: number;
        numberOfPaymentsSplit: number;
        numberOfPaymentsSplitRefunded: number;
        numberOfSplitPayments: number;
        numberOfSplitPaymentsRefunded: number;
        numberOfPlatformFeesCollected: number;
        numberOfPlatformFeesRefunded: number;
        numberOfChargebacks: number;
        numberOfChargebackReversals: number;
        numberOfPlatformChargebacks: number;
        numberOfPlatformChargebackReversals: number;
        numberOfTransfersIn: number;
        numberOfTransfersOut: number;
        numberOfCustomers: number;
        numberOfNewCustomers: number;
    }
    scheme?: PayoutMethodScheme | null | undefined;
    createdTimestamp: number
    scheduledTimestamp: number
    completedTimestamp?: number | null | undefined;
    metadata?: Record<string, string> | null | undefined;
}
