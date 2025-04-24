export interface PlatformFee {
    id: string
    paymentSessionId: string
    amount: number
    paymentAmount: number
    netAmount: number
    currency: string
    fromAccountId: string
    createdTimestamp: number
}

export interface PlatformFees {
    items: PlatformFee[]
}

export interface PlatformFeeRefund {
    id: string;
    platformFeeId: string;
    amount: number;
    currency: string;
    reason?: string | undefined | null;
    status: "Pending" | "Failed" | "Succeeded";
    createdTimestamp: number
    lastUpdatedTimestamp: number
}

export interface PlatformFeeRefunds {
    items: PlatformFeeRefund[]
}
