export interface Customer {
    id: string
    email: string;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    homePhoneNumber?: string | null | undefined;
    mobilePhoneNumber?: string | null | undefined;
    defaultPaymentMethod?: string | null | undefined;
    metadata?: Record<string, string>;
    createdTimestamp: number;
}

export interface Customers {
    items: Customer[];
    paginationToken?: string;
}

