import { DeletedResource } from "../types/deleted";
import { PaymentMethod } from "../types/paymentMethods/paymentMethods";
import { UpdatePaymentMethodRequest } from "../types/paymentMethods/req";
import { makeRequest } from "../utils/http";

/**
  * The Payment Methods API allows you to tokenize and store previously used payment methods.
  * Docs: https://api-reference.ryftpay.com/#tag/Payment-Methods
  */
export class PaymentMethodsClient {
    private readonly path = '/payment-methods';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async get(id: string): Promise<PaymentMethod> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, request: UpdatePaymentMethodRequest): Promise<PaymentMethod> {
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
