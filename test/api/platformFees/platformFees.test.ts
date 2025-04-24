import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockPlatformFee } from './mockData/mockPlatformFree';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { RyftError } from '../../../src/types/errors';
import { mockPlatformFeeRefund } from './mockData/mockPlatformFeeRefund';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const feeId = 'pf_01FCTS1XMKH9FF43CAFA4CXT3P';

describe('platformFees', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockPlatformFee],
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.platformFees.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/platform-fees', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockPlatformFee],
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/platform-fees');
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '40');

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.platformFees.list(true, 40);

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

            await expect(client.platformFees.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/platform-fees', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

    describe('getFee', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPlatformFee,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.platformFees.get(feeId);

            expect(result).toEqual(mockPlatformFee);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/platform-fees/${feeId}`, {
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

            await expect(client.platformFees.get(feeId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/platform-fees/${feeId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

    describe('getRefunds', () => {

        test('success', async () => {
            const mockResponse = {
                items: [mockPlatformFeeRefund],
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.platformFees.getRefunds(feeId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/platform-fees/${feeId}/refunds`, {
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

            await expect(client.platformFees.get(feeId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/platform-fees/${feeId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

});
