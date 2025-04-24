import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockCustomer } from './mockData/mockCustomer';
import { mockCreateCustomerReq } from './mockData/mockCreateCustomerReq';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockUpdateCustomerReq } from './mockData/mockUpdateCustomerReq';
import { mockPaymentMethod } from './mockData/mockPaymentMethod';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('customers', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockCustomer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.create(mockCreateCustomerReq);

            expect(result).toEqual(mockCustomer);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/customers', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateCustomerReq),
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
            await expect(client.customers.create(mockCreateCustomerReq)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/customers', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateCustomerReq),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockCustomer]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/customers', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockCustomer]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.list('test@ryftpay.com', 123, 456, true, 20, 'abc',);

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/customers');
            expectedUrl.searchParams.append('email', 'test@ryftpay.com');
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

            await expect(client.customers.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/customers', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockCustomer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.get(customerId);

            expect(result).toEqual(mockCustomer);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.customers.get(customerId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockCustomer,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.update(customerId, mockUpdateCustomerReq);

            expect(result).toEqual(mockCustomer);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateCustomerReq),
            });

        });

        test('failure', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.customers.update(customerId, mockUpdateCustomerReq)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateCustomerReq),
            });
        });

    });

    describe('delete', () => {

        test('success', async () => {
            const customerId = 'cus_123'
            const mockResponse = {
                id: 'cus_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.delete(customerId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.customers.delete(customerId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

    describe('getPaymentMethods', () => {

        test('success', async () => {
            const customerId = 'cus_123'
            const mockResponse = {
                items: [mockPaymentMethod],
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.customers.getPaymentMethods(customerId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}/payment-methods`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const customerId = 'cus_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.customers.getPaymentMethods(customerId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/customers/${customerId}/payment-methods`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

})
