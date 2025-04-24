import { SplitPaymentRequest } from "./paymentSessionsReq";

export interface CapturePaymentSessionRequest {
    amount?: number;
    captureType?: string;
    platformFee?: number;
    splits?: SplitPaymentRequest;
}

export interface RefundPaymentSessionRequest {
    amount?: number | null | undefined;
    reason?: string;
    refundPlatformFee?: boolean;
    splits?: SplitPaymentRequest;
    captureTransaction?: {
        id: string;
    };
}
