import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockPayout } from './mockData/mockPayout';
import { mockCreatePayoutRequest } from './mockData/mockCreatePayoutReq';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('payouts', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            const accountId = 'acc_123'
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayout,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payouts.create(accountId, mockCreatePayoutRequest);

            expect(result).toEqual(mockPayout);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutRequest),
            });
        });

        test('failure', async () => {
            const accountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.payouts.create(accountId, mockCreatePayoutRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutRequest),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const accountId = 'acc_123'

            const mockResponse = {
                items: [mockPayout]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payouts.list(accountId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const accountId = 'acc_123'

            const mockResponse = {
                items: [mockPayout]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payouts.list(accountId,123,456, true, 20, 'abc');

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts`);
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
            const accountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payouts.list(accountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

    describe('get', () => {

        test('success', async () => {
            const accountId = 'acc_123'
            const payoutId = 'pay_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayout,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payouts.get(accountId, payoutId);

            expect(result).toEqual(mockPayout);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts/${payoutId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('failure', async () => {
            const accountId = 'acc_123'
            const payoutId = 'pay_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payouts.get(accountId, payoutId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payouts/${payoutId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });
})
