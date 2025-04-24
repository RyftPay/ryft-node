import { Payout, Payouts } from "../types/payouts/payouts";
import { CreatePayoutRequest } from "../types/payouts/req";
import { makeRequest } from "../utils/http";

/**
  * A payout represents the transfer of money from Ryft to a connected payout method (bank account), i.e. when we send money you're owed. Typically this is automated.
  * However, the payouts API allows you to explicitly create payouts for your sub accounts. Generally we'd recommend this if you are a marketplace who wants to control exactly when payouts should be sent out.
  * Docs: https://api-reference.ryftpay.com/#tag/Payouts
  */
export class PayoutsClient {

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(id: string, request: CreatePayoutRequest): Promise<Payout> {
        return makeRequest({
            path: `/accounts/${id}/payouts`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async list(
        id: string,
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Payouts> {
        return makeRequest({
            path: `/accounts/${id}/payouts`,
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

    async get(id: string, payoutId: string): Promise<Payout> {
        return makeRequest({
            path: `/accounts/${id}/payouts/${payoutId}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

}
