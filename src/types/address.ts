export interface Address {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    lineOne?: string | null | undefined;
    lineTwo?: string | null | undefined;
    city?: string | null | undefined;
    country: string;
    postalCode: string;
    region?: string | null | undefined;
}

export interface AccountAddress {
    lineOne: string;
    lineTwo?: string | null | undefined;
    city?: string | null | undefined;
    country: string;
    postalCode: string;
    region?: string | null | undefined;
}

