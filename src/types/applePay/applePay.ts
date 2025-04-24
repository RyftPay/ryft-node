export interface ApplePayWebDomain {
    id: string;
    domainName: string;
    createdTimestamp: number;
}

export interface ApplePayWebDomains {
    items: ApplePayWebDomain[];
    paginationToken?: string | null;
}

export interface ApplePayWebSession {
     sessionObject: string;
}
