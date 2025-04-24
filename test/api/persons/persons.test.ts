import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockPerson } from './mockData/mockPerson';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { mockCreatePersonRequest } from './mockData/mockCreatePersonReq';
import { RyftError } from '../../../src/types/errors';
import { mockUpdatePersonRequest } from './mockData/mockUpdatePersonReq';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const accountId = 'acc_123';
const personId = 'per_123'

describe('persons', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPerson,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.persons.create(accountId, mockCreatePersonRequest);

            expect(result).toEqual(mockPerson);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePersonRequest),
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
            await expect(client.persons.create(accountId, mockCreatePersonRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePersonRequest),
            });
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockPerson]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.persons.list(accountId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockPerson]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.persons.list(accountId, true, 20);

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons`);
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '20');

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

            await expect(client.persons.list(accountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPerson,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.persons.get(accountId, personId);

            expect(result).toEqual(mockPerson);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
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

            await expect(client.persons.get(accountId, personId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPerson,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.persons.update(accountId, personId, mockUpdatePersonRequest);

            expect(result).toEqual(mockPerson);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePersonRequest),
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

            await expect(client.persons.update(accountId,personId, mockUpdatePersonRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdatePersonRequest),
            });
        });

    });

    describe('delete', () => {

        test('success', async () => {
            const mockResponse = {
                id: 'per_123',
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.persons.delete(accountId, personId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
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

            await expect(client.persons.delete(accountId, personId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${accountId}/persons/${personId}`, {
                method: 'DELETE',
                headers: defaultHeaders,
            });
        });

    });

})
