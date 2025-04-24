import { ApplePayWebDomain, ApplePayWebDomains, ApplePayWebSession } from "../types/applePay/applePay";
import { DeletedResource } from "../types/deleted";
import { makeRequest } from "../utils/http";

/**
  * Allows implementation of Apple Pay on the web via the API with Ryft's Apple Pay processing certificate.
  * Docs: https://api-reference.ryftpay.com/#tag/Apple-Pay
  */
export class ApplePayClient {
    private readonly domainsPath = '/apple-pay/web-domains';
    private readonly sessionsPath = '/apple-pay/sessions';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async registerDomain(domainName: string, account?: string): Promise<ApplePayWebDomain> {
        return makeRequest({
            path: this.domainsPath,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                domainName
            },
            ...(account && { extraHeaders: { Account: account } })
        })
    }

    async listDomains(
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
        account?: string
    ): Promise<ApplePayWebDomains> {
        return makeRequest({
            path: this.domainsPath,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
                startsAfter,
            },
            ...(account && { extraHeaders: { Account: account } }),
        })
    }

    async getDomain(id: string, account?: string): Promise<ApplePayWebDomain> {
        return makeRequest({
            path: `${this.domainsPath}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } }),
        })
    }

    async deleteDomain(id: string, account?: string): Promise<DeletedResource> {
        return makeRequest({
            path: `${this.domainsPath}/${id}`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } }),
        })
    }

    async createSession(displayName: string, domainName: string, account?: string): Promise<ApplePayWebSession> {
        return makeRequest({
            path: this.sessionsPath,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                displayName,
                domainName,
            },
            ...(account && { extraHeaders: { Account: account } }),
        })
    }
}
