import { PaymentSessionPaymentMethod } from "./paymentSessions";
import { SplitPaymentRequest } from "./paymentSessionsReq";

export interface PaymentSessionTransactions {
    items: PaymentSessionTransaction[];
    paginationToken?: string;
}

export interface PaymentSessionTransaction {
    id: string;
    paymentSessionId: string;
    amount: number;
    currency: string
    type: string;
    status: string;
    refundedAmount?: number;
    platformFee?: number;
    platformFeeRefundedAmount?: number;
    processingFee?: number;
    reason?: string;
    captureType?: string;
    paymentMethod?: PaymentSessionPaymentMethod;
    splitPaymentDetail?: SplitPaymentRequest;
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
}
