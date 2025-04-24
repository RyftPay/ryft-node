import { DeletedResource } from "../types/deleted";
import { CreateWebhookRequest, UpdateWebhookRequest } from "../types/webhooks/req";
import { CreatedWebhook, Webhook, Webhooks } from "../types/webhooks/webhooks";
import { makeRequest } from "../utils/http";

/**
  * Create and manage webhooks.
  *
  * **Signatures**
  * As an additional security measure, you can verify the integrity of any webhook event you receive by checking the signature we provide within the Signature header.
  * To do this simply take the webhook endpoint secret and HMAC-SHA256 the request body.
  * If the signatures are not equal then you may want to discard the message.
  *
  * Docs: https://api-reference.ryftpay.com/#tag/Webhooks
  */
export class WebhooksClient {
    private readonly path = '/webhooks';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(request: CreateWebhookRequest): Promise<CreatedWebhook> {
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

    async list(): Promise<Webhooks> {
        return makeRequest({
            path: this.path,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async get(id: string): Promise<Webhook> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, request: UpdateWebhookRequest): Promise<Webhook> {
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

    async delete(id: string): Promise<DeletedResource> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }
}
