import { Address } from "../address";

export interface PaymentMethods {
    items: PaymentMethod[];
}

export interface PaymentMethod {
    id: string;
    type: string;
    customerId?: string | null | undefined;
    createdTimestamp: number;
    card?: Card | null | undefined;
    billingAddress?: Address | null | undefined;
    checks?: Checks | null | undefined;
}

export interface Card {
    scheme: string;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
}

export interface Checks {
    avsResponseCode?: string | null | undefined;
    cvvResponseCode?: string | null | undefined;
}

