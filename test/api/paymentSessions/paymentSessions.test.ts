import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { mockCreatePaymentSessionRequest } from './mockData/mockCreatePaymentSessionReq';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { RyftError } from '../../../src/types/errors';
import { mockUpdatePaymentSessionRequest } from './mockData/mockUpdatePaymentSessionReq';
import { mockPaymentSessionTransaction } from './mockData/mockPaymentSessionTx';
import {
    mockContinuePaymentRequest_Submit3DSChallengeResult,
    mockContinuePaymentRequest_Submit3DSFingerprintResult,
} from './mockData/mockContinuePaymentReq';
import {
    mockCapturePaymentRequest_SplitPayments,
    mockCapturePaymentRequest_WithMultiCaptureNonFinal,
    mockCapturePaymentRequest_WithPartialAmount,
} from './mockData/mockCapturePaymentReq';
import {
    mockRefundPaymentRequest_MarketplaceFullRefundSplitPayment,
    mockRefundPaymentRequest_MarketplacePartialRefundSplitPayment,
    mockRefundPaymentRequest_MarketplaceRefundPlatformFee,
    mockRefundPaymentRequest_PartialRefund,
    mockRefundPaymentRequest_RefundMultiCaptureTransaction,
    mockRefundPaymentRequest_WithReason,
} from './mockData/mockRefundPaymentReq';
import {
    mockAttemptPaymentRequest_With3DS,
    mockAttemptPaymentRequest_WithApplePayToken,
    mockAttemptPaymentRequest_WithBillingAddressIncluded,
    mockAttemptPaymentRequest_WithCard,
    mockAttemptPaymentRequest_WithCardAndSave,
    mockAttemptPaymentRequest_WithCustomerIncluded,
    mockAttemptPaymentRequest_WithGooglePayToken,
    mockAttemptPaymentRequest_WithSavedPaymentMethod,
} from './mockData/mockAttemptPaymentReq';
import { mockPaymentSession } from './mockData/mockPaymentSession';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const paymentSessionId = 'pay_123'
const transactionId = 'tx_123'

describe('paymentSessions', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSession,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.create(mockCreatePaymentSessionRequest);

            expect(result).toEqual(mockPaymentSession);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePaymentSessionRequest),
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.create(mockCreatePaymentSessionRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePaymentSessionRequest),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockPaymentSession]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockPaymentSession]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.list(123, 456, true, 20, 'abc');

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/payment-sessions');
            expectedUrl.searchParams.append('startTimestamp', '123');
            expectedUrl.searchParams.append('endTimestamp', '456');
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '20');
            expectedUrl.searchParams.append('startsAfter', 'abc');

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentSessions.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSession,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.get(paymentSessionId);

            expect(result).toEqual(mockPaymentSession);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentSessions.get(paymentSessionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSession,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.update(paymentSessionId, mockUpdatePaymentSessionRequest);

            expect(result).toEqual(mockPaymentSession);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePaymentSessionRequest),
            });

        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentSessions.update(paymentSessionId, mockUpdatePaymentSessionRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePaymentSessionRequest),
            });
        });

    });

    describe('attemptPayment', () => {

        test('success - with card', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithCard);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithCard),
            });
        });

        test('success - with card and save', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithCardAndSave);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithCardAndSave),
            });
        });

        test('success - with card and saved payment method', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithSavedPaymentMethod);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithSavedPaymentMethod),
            });
        });

        test('success - google pay token', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithGooglePayToken);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithGooglePayToken),
            });
        });

        test('success - apple pay token', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithApplePayToken);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithApplePayToken),
            });
        });

        test('success - with billing address', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithBillingAddressIncluded);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithBillingAddressIncluded),
            });
        });

        test('success - with customer included', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithCustomerIncluded);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithCustomerIncluded),
            });
        });

        test('success - 3ds', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_With3DS);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_With3DS),
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.attemptPayment(mockAttemptPaymentRequest_WithCard)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/attempt-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockAttemptPaymentRequest_WithCard),
            });
        });

    });

    describe('continuePayment', () => {

        test('success - 3ds fingerprint result', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.continuePayment(mockContinuePaymentRequest_Submit3DSFingerprintResult);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/continue-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockContinuePaymentRequest_Submit3DSFingerprintResult),
            });
        });

        test('success - 3ds challenge result', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.continuePayment(mockContinuePaymentRequest_Submit3DSChallengeResult);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/continue-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockContinuePaymentRequest_Submit3DSChallengeResult),
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.continuePayment(mockContinuePaymentRequest_Submit3DSChallengeResult)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/payment-sessions/continue-payment', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockContinuePaymentRequest_Submit3DSChallengeResult),
            });
        });

    });

    describe('listTransactions', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockPaymentSessionTransaction]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.listTransactions(paymentSessionId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/transactions`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockPaymentSessionTransaction]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.listTransactions(paymentSessionId, true, 20, 'abc');

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/transactions`);
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '20');
            expectedUrl.searchParams.append('startsAfter', 'abc');

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentSessions.listTransactions(paymentSessionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/transactions`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const paymentSessionId = 'pay_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.getTransaction(paymentSessionId, transactionId);

            expect(result).toEqual(mockPaymentSession);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/transactions/${transactionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const paymentSessionId = 'pay_123'
            const transactionId = 'tx_123'

            const mockResponse = {
                requestId: 'req_123',
                code: "bad_request",
                errors: [
                    {
                        code: "bad_request",
                        message: "incorrect field"
                    }
                ],
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentSessions.getTransaction(paymentSessionId, transactionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/transactions/${transactionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('capture', () => {

        test('success - with partial amount', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.capture(paymentSessionId, mockCapturePaymentRequest_WithPartialAmount);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/captures`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCapturePaymentRequest_WithPartialAmount),
            });
        });

        test('success - with capture non final', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.capture(paymentSessionId, mockCapturePaymentRequest_WithMultiCaptureNonFinal);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/captures`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCapturePaymentRequest_WithMultiCaptureNonFinal),
            });
        });

        test('success - with split payments', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.capture(paymentSessionId, mockCapturePaymentRequest_SplitPayments);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/captures`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCapturePaymentRequest_SplitPayments),
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.capture(paymentSessionId, mockCapturePaymentRequest_WithPartialAmount)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/captures`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCapturePaymentRequest_WithPartialAmount),
            });
        });

    });

    describe('void', () => {

        test('success', async () => {
            const paymentSessionId = 'pay_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.void(paymentSessionId);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/voids`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.void(paymentSessionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/voids`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });

    });

    describe('refund', () => {

        test('success - partial refund', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_PartialRefund);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_PartialRefund),
            });
        });

        test('success - with reason', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_WithReason);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_WithReason),
            });
        });

        test('success - refund multi capture transaction', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_RefundMultiCaptureTransaction);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_RefundMultiCaptureTransaction),
            });
        });

        test('success - refund platform fee', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_MarketplaceRefundPlatformFee);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_MarketplaceRefundPlatformFee),
            });
        });

        test('success - partial refund split payments', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_MarketplacePartialRefundSplitPayment);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_MarketplacePartialRefundSplitPayment),
            });
        });

        test('success - full refund split payments', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentSessionTransaction,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_MarketplaceFullRefundSplitPayment);

            expect(result).toEqual(mockPaymentSessionTransaction);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_MarketplaceFullRefundSplitPayment),
            });
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.paymentSessions.refund(paymentSessionId, mockRefundPaymentRequest_PartialRefund)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-sessions/${paymentSessionId}/refunds`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockRefundPaymentRequest_PartialRefund),
            });
        });

    });

})
