export interface CreateCustomerRequest {
    email: string;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    homePhoneNumber?: string | null | undefined;
    mobilePhoneNumber?: string | null | undefined;
    metadata?: Record<string, string>;
}

export interface UpdateCustomerRequest {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    homePhoneNumber?: string | null | undefined;
    mobilePhoneNumber?: string | null | undefined;
    metadata?: Record<string, string>;
    defaultPaymentMethod?: string | null | undefined;
}
