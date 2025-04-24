import { PaymentSession, PaymentSessions } from "../types/paymentSessions/paymentSessions";
import { AttemptPaymentSessionRequest, ContinuePaymentSessionRequest, CreatePaymentSessionRequest, UpdatePaymentSessionRequest } from "../types/paymentSessions/paymentSessionsReq";
import { PaymentSessionTransaction, PaymentSessionTransactions } from "../types/paymentSessions/paymentSessionsTransactions";
import { CapturePaymentSessionRequest, RefundPaymentSessionRequest } from "../types/paymentSessions/paymentSessionsTransactionsReq";
import { makeRequest } from "../utils/http";

/**
  * Process payments with Ryft: authorizations, voids, captures, refunds etc.
  * Docs: https://api-reference.ryftpay.com/#tag/Payments
  */
export class PaymentSessionsClient {
    private readonly path = '/payment-sessions';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(request: CreatePaymentSessionRequest, account?: string): Promise<PaymentSession> {
        return makeRequest({
            path: this.path,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async list(
        startTimestamp?: number,
        endTimestamp?: number,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
        account?: string,
    ): Promise<PaymentSessions> {
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
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async get(id: string, account?: string): Promise<PaymentSession> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async update(id: string, request: UpdatePaymentSessionRequest, account?: string): Promise<PaymentSession> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async attemptPayment(request: AttemptPaymentSessionRequest, account?: string): Promise<PaymentSession> {
        return makeRequest({
            path: `${this.path}/attempt-payment`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async continuePayment(request: ContinuePaymentSessionRequest, account?: string): Promise<PaymentSession> {
        return makeRequest({
            path: `${this.path}/continue-payment`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async listTransactions(
        id: string,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
        account?: string,
    ): Promise<PaymentSessionTransactions> {
        return makeRequest({
            path: `${this.path}/${id}/transactions`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
                startsAfter,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async getTransaction(
        id: string,
        transactionId: string,
        account?: string,
    ): Promise<PaymentSessionTransaction> {
        return makeRequest({
            path: `${this.path}/${id}/transactions/${transactionId}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async capture(
        id: string,
        request: CapturePaymentSessionRequest,
        account?: string,
    ): Promise<PaymentSessionTransaction> {
        return makeRequest({
            path: `${this.path}/${id}/captures`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async void(id: string, account?: string): Promise<PaymentSessionTransaction> {
        return makeRequest({
            path: `${this.path}/${id}/voids`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async refund(id: string, request: RefundPaymentSessionRequest, account?: string): Promise<PaymentSessionTransaction> {
        return makeRequest({
            path: `${this.path}/${id}/refunds`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
            ...(account && { extraHeaders: { Account: account } })
        });
    }
}
