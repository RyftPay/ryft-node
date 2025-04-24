import { PlatformFees, PlatformFee, PlatformFeeRefunds } from "../types/platformFees/platformFees";
import { makeRequest } from "../utils/http";

/**
  * Query any platform fees that your account has taken (when taking payments on behalf of linked sub accounts)
  * Docs: https://api-reference.ryftpay.com/#tag/Platform-Fees
  */
export class FeesClient {
    private readonly path = '/platform-fees';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async list(ascending?: boolean, limit?: number): Promise<PlatformFees> {
        return makeRequest({
            path: this.path,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
            },
        })
    }

    async get(id: string): Promise<PlatformFee> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        })
    }

    async getRefunds(id: string): Promise<PlatformFeeRefunds> {
        return makeRequest({
            path: `${this.path}/${id}/refunds`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        })
    }
}
