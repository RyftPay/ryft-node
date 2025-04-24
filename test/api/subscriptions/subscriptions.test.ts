import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockSubscription } from './mockData/mockSubscription';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { mockCreateSubscriptionRequest } from './mockData/mockCreateSubscriptionReq';
import { RyftError } from '../../../src/types/errors';
import { mockUpdateSubscriptionRequest } from './mockData/mockUpdateSubscriptionReq';
import { mockPauseRequest } from './mockData/mockPauseRequest';
import { mockPaymentSession } from './mockData/mockPaymentSession';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('subscriptions', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubscription,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.create(mockCreateSubscriptionRequest);

            expect(result).toEqual(mockSubscription);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/subscriptions', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateSubscriptionRequest),
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
            await expect(client.subscriptions.create(mockCreateSubscriptionRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/subscriptions', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateSubscriptionRequest),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockSubscription]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/subscriptions', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockSubscription]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.list(123, 456, true, 20, 'abc');

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/subscriptions');
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

            await expect(client.subscriptions.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/subscriptions', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubscription,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.get(subscriptionId);

            expect(result).toEqual(mockSubscription);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.get(subscriptionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubscription,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.update(subscriptionId, mockUpdateSubscriptionRequest);

            expect(result).toEqual(mockSubscription);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateSubscriptionRequest),
            });

        });

        test('failure', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.update(subscriptionId, mockUpdateSubscriptionRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateSubscriptionRequest),
            });
        });

    });

    describe('pause', () => {

        test('success', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubscription,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.pause(subscriptionId, mockPauseRequest);

            expect(result).toEqual(mockSubscription);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/pause`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockPauseRequest),
            });

        });

        test('failure', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.pause(subscriptionId, mockPauseRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/pause`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockPauseRequest),
            });
        });

    })

    describe('resume', () => {

        test('success', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubscription,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.resume(subscriptionId);

            expect(result).toEqual(mockSubscription);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/resume`, {
                method: 'PATCH',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.resume(subscriptionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/resume`, {
                method: 'PATCH',
                headers: defaultHeaders,
            });
        });

    })

    describe('delete', () => {

        test('success', async () => {
            const subscriptionId = 'sub_123'

            const mockResponse = {
                id: 'sub_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.subscriptions.delete(subscriptionId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.delete(subscriptionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

    describe('getPaymentSessions', () => {

        test('success with defaults', async () => {
            const subscriptionId = 'sub_123'

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
            const result = await client.subscriptions.getPaymentSessions(subscriptionId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/payment-sessions`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const subscriptionId = 'sub_123'

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
            const result = await client.subscriptions.getPaymentSessions(subscriptionId, 123, 456, true, 20, 'abc');

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/payment-sessions`);
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
            const subscriptionId = 'sub_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.subscriptions.getPaymentSessions(subscriptionId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/subscriptions/${subscriptionId}/payment-sessions`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });
});

