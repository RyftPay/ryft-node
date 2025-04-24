import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { RyftError } from '../../../src/types/errors';
import { mockUpdatePaymentMethodRequest } from './mockData/mockUpdatePaymentMethodRequest';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const mockPaymentMethod = {
    id: 'pm_123',
    type: 'Card',
    createdTimestamp: 1470989538,
}

describe('paymentMethods', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('get', () => {

        test('success', async () => {
            const paymentMethodId = 'pm_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentMethods.get(paymentMethodId);

            expect(result).toEqual(mockPaymentMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const paymentMethodId = 'pm_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentMethods.get(paymentMethodId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const paymentMethodId = 'pm_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPaymentMethod,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentMethods.update(paymentMethodId, mockUpdatePaymentMethodRequest);

            expect(result).toEqual(mockPaymentMethod);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePaymentMethodRequest),
            });

        });

        test('failure', async () => {
            const paymentMethodId = 'pm_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentMethods.update(paymentMethodId, mockUpdatePaymentMethodRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePaymentMethodRequest),
            });
        });

    });

    describe('delete', () => {

        test('success', async () => {
            const paymentMethodId = 'pm_123'
            const mockResponse = {
                id: 'pm_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.paymentMethods.delete(paymentMethodId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const paymentMethodId = 'pm_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.paymentMethods.delete(paymentMethodId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/payment-methods/${paymentMethodId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

})
