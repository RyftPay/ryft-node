import { DeletedResource } from "../types/deleted";
import { PaymentSessions } from "../types/subscriptions/paymentSession";
import { CreateSubscriptionRequest, PauseSubscriptionRequest, UpdateSubscriptionRequest } from "../types/subscriptions/req";
import { Subscription, Subscriptions } from "../types/subscriptions/subscriptions";
import { makeRequest } from "../utils/http";

/**
  * The subscriptions API allows you to automatically have Ryft schedule and charge recurring payments for a specific day and time.
  * This API is not required to process recurring payments. 
  * After additional configuration, you can use our payment-sessions API to create and charge the recurring payments yourself.
  * Docs: https://api-reference.ryftpay.com/#tag/Subscriptions
  */
export class SubscriptionsClient {
    private readonly path = '/subscriptions';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(request: CreateSubscriptionRequest): Promise<Subscription> {
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
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Subscriptions> {
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

    async get(id: string): Promise<Subscription> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, request: UpdateSubscriptionRequest): Promise<Subscription> {
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

    async pause(id: string, request?: PauseSubscriptionRequest): Promise<Subscription> {
        return makeRequest({
            path: `${this.path}/${id}/pause`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async resume(id: string): Promise<Subscription> {
        return makeRequest({
            path: `${this.path}/${id}/resume`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async delete(id: string): Promise<DeletedResource> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async getPaymentSessions(
        id: string,
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<PaymentSessions> {
        return makeRequest({
            path: `${this.path}/${id}/payment-sessions`,
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

}
