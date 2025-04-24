import { Customer, Customers } from "../types/customers/customers";
import { CreateCustomerRequest, UpdateCustomerRequest } from "../types/customers/req";
import { DeletedResource } from "../types/deleted";
import { PaymentMethods } from "../types/paymentMethods/paymentMethods";
import { makeRequest } from "../utils/http";

/**
  * The Customers API allows you to persist customer details across sessions.
  * You should use this if you wish to support saving a customer's payment methods and thereby enabling them to reuse previously entered details for future payments.
  * Docs: https://api-reference.ryftpay.com/#tag/Customers
  */
export class CustomersClient {
    private readonly path = '/customers';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(request: CreateCustomerRequest): Promise<Customer> {
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
        email?: string,
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Customers> {
        return makeRequest({
            path: this.path,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                email,
                startTimestamp,
                endTimestamp,
                ascending,
                limit,
                startsAfter,
            },
        });
    }

    async get(id: string): Promise<Customer> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, request: UpdateCustomerRequest): Promise<Customer> {
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

    async getPaymentMethods(id: string): Promise<PaymentMethods> {
        return makeRequest({
            path: `${this.path}/${id}/payment-methods`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }
}
