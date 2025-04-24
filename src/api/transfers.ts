import { CreateTransferRequest } from "../types/transfers/req";
import { Transfer, Transfers } from "../types/transfers/transfers";
import { makeRequest } from "../utils/http";

/**
  * A Transfer represents the movement of money between Ryft accounts.
  * Docs: https://api-reference.ryftpay.com/#tag/Transfers
  */
export class TransfersClient {

    private readonly path = "/transfers";

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async transfer(request: CreateTransferRequest): Promise<Transfer> {
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

    async list(
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Transfers> {
        return makeRequest({
            path: this.path,
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

    async get(id: string): Promise<Transfer> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

}
