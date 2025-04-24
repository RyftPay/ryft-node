export interface Disputes {
    items: Array<Dispute>;
    paginationToken?: string | null | undefined;
}

export interface Dispute {
    id: string;
    amount: number;
    currency: string;
    status: string;
    category: string;
    reason: {
        code: string;
        description: string;
    }
    respondBy: number;
    recommendedEvidence: Array<string>;
    paymentSession: {
        id: string;
        paymentType: string;
        paymentMethod: {
            card: {
                scheme: string;
                last4: string;
            }
        }
    }
    evidence?: {
        text?: DisputeEvidenceTextEntries | null | undefined;
        files?: DisputeEvidenceFile | null | undefined;
    } | null | undefined;
    customer?: {
        email?: string | null | undefined;
        id?: string | null | undefined;
        createdTimestamp?: number | null | undefined;
    } | null | undefined;
    subAccount?: {
        id: string
    } | null | undefined;
    createdTimestamp: number;
    lastUpdatedTimestamp: number;
}

export interface DisputeEvidenceTextEntries {
    billingAddress: string;
    shippingAddress: string;
    duplicateTransaction: string;
    uncategorised: string;
}

export interface DisputeEvidenceFile {
    proofOfDelivery?: DisputeFile | null | undefined;
    customerSignature?: DisputeFile | null | undefined;
    receipt?: DisputeFile | null | undefined;
    shippingConfirmation?: DisputeFile | null | undefined;
    customerCommunication?: DisputeFile | null | undefined;
    refundPolicy?: DisputeFile | null | undefined;
    recurringPaymentAgreement?: DisputeFile | null | undefined;
    uncategorised?: DisputeFile | null | undefined;
}

export interface DisputeFile {
    id: string;
}
