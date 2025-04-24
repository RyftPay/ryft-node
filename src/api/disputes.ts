import { Dispute, Disputes } from "../types/disputes/disputes";
import { AddDisputeEvidenceRequest, DeleteDisputeEvidenceRequest } from "../types/disputes/req";
import { makeRequest } from "../utils/http";

/**
  * Disputes (also known as chargebacks) occur when a cardholder wants to query or challenge a transaction on their card statement.
  * The Disputes API allows you to keep track of and manage disputes.
  * Docs: https://api-reference.ryftpay.com/#tag/Disputes
  */
export class DisputesClient {
    private readonly path = '/disputes';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async list(
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Disputes> {
        return makeRequest({
            path: this.path,
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

    async get(id: string): Promise<Dispute> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async accept(id: string): Promise<Dispute> {
        return makeRequest({
            path: `${this.path}/${id}/accept`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async challenge(id: string): Promise<Dispute> {
        return makeRequest({
            path: `${this.path}/${id}/challenge`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async addEvidence(id: string, request: AddDisputeEvidenceRequest): Promise<Dispute> {
        return makeRequest({
            path: `${this.path}/${id}/evidence`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async deleteEvidence(id: string, request: DeleteDisputeEvidenceRequest): Promise<Dispute> {
        return makeRequest({
            path: `${this.path}/${id}/evidence`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request
            },
        });
    }
}
