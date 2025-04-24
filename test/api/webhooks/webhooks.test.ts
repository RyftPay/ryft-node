import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockWebhook } from './mockData/mockWebhook';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { mockCreateWebhookRequest } from './mockData/mockCreateWebhookReq';
import { RyftError } from '../../../src/types/errors';
import { mockUpdateWebhookRequest } from './mockData/mockUpdateWebhookReq';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;
const webhookId = 'wh_123'

describe('webhooks', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockWebhook,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.webhooks.create(mockCreateWebhookRequest);

            expect(result).toEqual(mockWebhook);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/webhooks', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateWebhookRequest),
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
            await expect(client.webhooks.create(mockCreateWebhookRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/webhooks', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateWebhookRequest),
            });
        });

    });

    describe('list', () => {

        test('success', async () => {
            const mockResponse = {
                items: [mockWebhook]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.webhooks.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/webhooks', {
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

            await expect(client.webhooks.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/webhooks', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockWebhook,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.webhooks.get(webhookId);

            expect(result).toEqual(mockWebhook);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const webhookId = 'wh_123'

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

            await expect(client.webhooks.get(webhookId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const webhookId = 'wh_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockWebhook,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.webhooks.update(webhookId, mockUpdateWebhookRequest);

            expect(result).toEqual(mockWebhook);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateWebhookRequest),
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

            await expect(client.webhooks.update(webhookId, mockUpdateWebhookRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateWebhookRequest),
            });
        });

    });

    describe('delete', () => {

        test('success', async () => {
            const mockResponse = {
                id: 'wh_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.webhooks.delete(webhookId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'DELETE',
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

            await expect(client.webhooks.delete(webhookId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/webhooks/${webhookId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

})
