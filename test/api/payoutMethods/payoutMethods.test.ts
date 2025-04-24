import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockPayoutMethod } from './mockData/mockPayoutMethod';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { mockCreatePayoutMethodRequest_EURBankAccount, mockCreatePayoutMethodRequest_GBPBankAccount, mockCreatePayoutMethodRequest_USDBankAccount } from './mockData/mockCreatePayoutMethodReq';
import { RyftError } from '../../../src/types/errors';
import { mockUpdatePayoutMethodRequest } from './mockData/mockUpdatePayoutMethodReq';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('payoutMethods', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success - gbp account', async () => {
            const accountId = 'acc_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayoutMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.create(accountId, mockCreatePayoutMethodRequest_GBPBankAccount);

            expect(result).toEqual(mockPayoutMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutMethodRequest_GBPBankAccount),
            });
        });

        test('success - eur account', async () => {
            const accountId = 'acc_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayoutMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.create(accountId, mockCreatePayoutMethodRequest_EURBankAccount);

            expect(result).toEqual(mockPayoutMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutMethodRequest_EURBankAccount),
            });
        });

        test('success - usd account', async () => {
            const accountId = 'acc_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayoutMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.create(accountId, mockCreatePayoutMethodRequest_USDBankAccount);

            expect(result).toEqual(mockPayoutMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutMethodRequest_USDBankAccount),
            });
        });

        test('failure', async () => {
            const accountId = 'acc_123';
            mockedFetch.mockImplementation(async () =>

                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.payoutMethods.create(accountId, mockCreatePayoutMethodRequest_EURBankAccount)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutMethodRequest_EURBankAccount),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const accountId = 'acc_123';

            const mockResponse = {
                items: [mockPayoutMethod]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.list(accountId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const accountId = 'acc_123';

            const mockResponse = {
                items: [mockPayoutMethod]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.list(accountId, true, 20);

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`);
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '20');

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const accountId = 'acc_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payoutMethods.list(accountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayoutMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.get(accountId, payoutMethodId);

            expect(result).toEqual(mockPayoutMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payoutMethods.get(accountId, payoutMethodId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayoutMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.update(accountId, payoutMethodId, mockUpdatePayoutMethodRequest);

            expect(result).toEqual(mockPayoutMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePayoutMethodRequest),
            });

        });

        test('failure', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payoutMethods.update(accountId, payoutMethodId, mockUpdatePayoutMethodRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePayoutMethodRequest),
            });
        });

    });

    describe('delete', () => {

        test('success', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            const mockResponse = {
                id: 'pmt_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.payoutMethods.delete(accountId, payoutMethodId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const accountId = 'acc_123'
            const payoutMethodId = 'pmt_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.payoutMethods.delete(accountId, payoutMethodId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/payout-methods/${payoutMethodId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

})
