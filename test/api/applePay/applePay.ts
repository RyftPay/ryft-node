import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockApplePay } from './mockData/mockApplePay';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src/client';
import { RyftError } from '../../../src/types/errors';
import { mockApplePayWebSession } from './mockData/mockApplePayWebSession';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const domainName = 'https://domain.test';
const account = 'acc_123';

const headers = {
    ...defaultHeaders,
    'Account': account,
};

describe('applePay', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('registerDomain', () => {

        test('success', async () => {

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockApplePay,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.applePay.registerDomain(domainName);

            expect(result).toEqual(mockApplePay);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains', {
                method: 'POST',
                headers,
                body: JSON.stringify({ domainName })
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

            await expect(client.applePay.registerDomain(domainName, account)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains', {
                method: 'POST',
                headers,
                body: JSON.stringify({ domainName })
            });
        });

    });

    describe('listDomains', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockApplePay],
                paginationToken: "",
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.applePay.listDomains();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains', {
                method: 'GET',
                headers,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockApplePay],
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains');
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '30');
            expectedUrl.searchParams.append('startsAfter', 'starts-123');

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.applePay.listDomains(true, 30, 'starts-123', 'acc_123');

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
                method: 'GET',
                headers,
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

            await expect(client.applePay.listDomains()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains', {
                method: 'GET',
                headers,
            });
        });

    });

    describe('getDomain', () => {

        test('success', async () => {
            const domainId = 'ap_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockApplePay,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.applePay.getDomain(domainId, account);

            expect(result).toEqual(mockApplePay);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains/${domainId}`, {
                method: 'GET',
                headers,
            });
        });

        test('failure', async () => {
            const domainId = 'ap_123';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.applePay.getDomain(domainId, account)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains/${domainId}`, {
                method: 'GET',
                headers,
            });
        });

    });

    describe('deleteDomain', () => {

        test('success', async () => {
            const id = 'awd_123';

            const mockResponse = {
                id,
            };

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.applePay.deleteDomain(id, account);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains/${id}`, {
                method: 'DELETE',
                headers,
            });
        });

        test('failure', async () => {
            const domainId = 'awd_123';
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});

            await expect(client.applePay.deleteDomain(domainId, account)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/web-domains/${domainId}`, {
                method: 'DELETE',
                headers,
            });
        });

    });

    describe('createSession', () => {

        test('success', async () => {
            const displayName = 'merchant';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockApplePayWebSession,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.applePay.createSession(displayName, domainName, account);

            expect(result).toEqual(mockApplePayWebSession);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/sessions`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ displayName, domainName }),
            });
        });

        test('failure', async () => {
            const displayName = 'merchant';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.applePay.createSession(displayName, domainName, account)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/apple-pay/sessions`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ displayName, domainName }),
            });
        });

    });

});
