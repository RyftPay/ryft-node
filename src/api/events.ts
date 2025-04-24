import { Event, Events } from "../types/events/events";
import { makeRequest } from "../utils/http";

/**
  * Events are persisted throughout the lifecycle of a payment/action as you use our API.
  * We use events to notify you when something important happens in your account (or a linked sub account).
  * The most commonly used event occurs when a payment is captured, in which case we persist a `PaymentSession.captured` event and then (optionally) send it to any webhooks you have registered that are listening for that event type.
  * Note that if you are taking payments as a platform (for sub accounts), events are saved against the sub account `accountId`, but will be sent to any webhooks that your account has configured.
  * Docs: https://api-reference.ryftpay.com/#tag/Events
  */
export class EventsClient {
    private readonly path = '/events';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async list(
        ascending?: boolean,
        limit?: number,
        account?: string
    ): Promise<Events> {
        return makeRequest({
            path: this.path,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
            },
            ...(account && { extraHeaders: { Account: account } }),
        })
    }

    async get(id: string, account?: string): Promise<Event> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } }),
        })
    }
}
