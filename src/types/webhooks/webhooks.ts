import { WebhookEventType } from "./webhookEventType";

export interface Webhooks {
    items: Array<Webhook>;
}

export interface Webhook {
    id: string;
    active: boolean;
    eventTypes: Array<WebhookEventType>;
    createdTimestamp: number;
}

export interface CreatedWebhook {
    secret: string;
    id: string;
    active: boolean;
    eventTypes: Array<WebhookEventType>;
    createdTimestamp: number;
}
