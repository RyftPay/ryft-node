import { AccountAuthorization, SubAccount } from "../types/accounts/accounts";
import { CreateSubAccountRequest, UpdateSubAccountRequest } from "../types/accounts/accountsReq";
import { Payout, Payouts } from "../types/accounts/payouts";
import { CreatePayoutRequest } from "../types/payouts/req";
import { makeRequest } from "../utils/http";

export class AccountsClient {
    private readonly path = '/accounts';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(request: CreateSubAccountRequest): Promise<SubAccount> {
        return makeRequest({
            path: this.path,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async get(id: string): Promise<SubAccount> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, request: UpdateSubAccountRequest): Promise<SubAccount> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async verify(id: string): Promise<SubAccount> {
        return makeRequest({
            path: `${this.path}/${id}/verify`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async createPayout(id: string, request: CreatePayoutRequest): Promise<Payout> {
        return makeRequest({
            path: `${this.path}/${id}/payouts`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async listPayouts(
        id: string,
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Payouts> {
        return makeRequest({
            path: `${this.path}/${id}/payouts`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                startTimestamp,
                endTimestamp,
                ascending,
                limit,
                startsAfter,
            },
        });
    }

    async getPayout(id: string, payoutId: string): Promise<Payout> {
        return makeRequest({
            path: `${this.path}/${id}/payouts/${payoutId}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async createAuthLink(request: { email: string, redirectUrl: string }): Promise<AccountAuthorization> {
        return makeRequest({
            path: `${this.path}/authorize`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }
}

