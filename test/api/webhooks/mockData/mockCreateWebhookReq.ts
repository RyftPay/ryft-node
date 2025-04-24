import { WebhookEventType } from "../../../../src/types/webhooks/webhookEventType";

export const mockCreateWebhookRequest = {
    "url": "https://example-endpoint.com/webhook",
    "active": true,
    "eventTypes": [
        "PaymentSession.captured",
        "PaymentSession.refunded"
    ] as WebhookEventType[]
}
