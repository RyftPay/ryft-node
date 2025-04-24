import { DeletedResource } from "../types/deleted";
import { PayoutMethod, PayoutMethods } from "../types/payoutMethods/payoutMethod";
import { CreatePayoutMethodRequest, UpdatePayoutMethodRequest } from "../types/payoutMethods/req";
import { makeRequest } from "../utils/http";

/**
  * The Payout Methods API allows the creation and management of payout methods for use when receiving payouts, e.g. bank accounts.
  * Recommended if you wish to implement payouts programmatically for your sub accounts.
  * Docs: https://api-reference.ryftpay.com/#tag/Payout-Methods
  */
export class PayoutMethodsClient {
    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(id: string, request: CreatePayoutMethodRequest): Promise<PayoutMethod> {
        return makeRequest({
            path: `/accounts/${id}/payout-methods`,
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
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<PayoutMethods> {
        return makeRequest({
            path: `/accounts/${id}/payout-methods`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
                startsAfter,
            },
        });
    }

    async get(id: string, payoutMethodId: string): Promise<PayoutMethod> {
        return makeRequest({
            path: `/accounts/${id}/payout-methods/${payoutMethodId}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, payoutMethodId: string, request: UpdatePayoutMethodRequest): Promise<PayoutMethod> {
        return makeRequest({
            path: `/accounts/${id}/payout-methods/${payoutMethodId}`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async delete(id: string, payoutMethodId: string): Promise<DeletedResource> {
        return makeRequest({
            path: `/accounts/${id}/payout-methods/${payoutMethodId}`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

}
