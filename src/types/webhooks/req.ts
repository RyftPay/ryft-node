import { WebhookEventType } from "./webhookEventType";

export interface CreateWebhookRequest {
    url: string;
    active: boolean;
    eventTypes: WebhookEventType[];
}

export interface UpdateWebhookRequest {
    url: string;
    active: boolean;
    eventTypes: WebhookEventType[];
}
