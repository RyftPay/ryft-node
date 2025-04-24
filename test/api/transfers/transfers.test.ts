import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockTransfer } from './mockData/mockTransfer';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { mockCreateTransferRequest_PullMoneyFromSubAccount, mockCreateTransferRequest_SendMoneyToSubAccount } from './mockData/mockCreateTransferReq';
import { RyftError } from '../../../src/types/errors';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('payouts', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success - send money to sub account', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockTransfer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.transfers.transfer(mockCreateTransferRequest_SendMoneyToSubAccount);

            expect(result).toEqual(mockTransfer);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/transfers`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateTransferRequest_SendMoneyToSubAccount),
            });
        });

        test('success - pull money from sub account', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockTransfer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.transfers.transfer(mockCreateTransferRequest_PullMoneyFromSubAccount);

            expect(result).toEqual(mockTransfer);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/transfers`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateTransferRequest_PullMoneyFromSubAccount),
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

            const client = new Ryft({ secretKey: mockSecretKey});
            await expect(client.transfers.transfer( mockCreateTransferRequest_PullMoneyFromSubAccount)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/transfers`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateTransferRequest_PullMoneyFromSubAccount),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockTransfer]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.transfers.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/transfers', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockTransfer]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.transfers.list(true, 40, 'abc');

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/transfers`);
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '40');
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

            await expect(client.transfers.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/transfers', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

    describe('get', () => {
            const transferId = 'tran_123'

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockTransfer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.transfers.get( transferId);

            expect(result).toEqual(mockTransfer);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/transfers/${transferId}`, {
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

            await expect(client.transfers.get(transferId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/transfers/${transferId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });
})
