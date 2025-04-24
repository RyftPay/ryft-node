import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { mockEvent } from './mockData/mockEvent';
import { RyftError } from '../../../src/types/errors';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const eventId = 'e_123'
const accountId = 'acc_123'

const headers = {
    ...defaultHeaders,
    'Account': accountId,
};

describe('events', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [mockEvent]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.events.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/events', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [mockEvent]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.events.list(true,5,'acc_123');

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/events');
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '5');

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

            await expect(client.events.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/events', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockEvent,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.events.get(eventId, accountId);

            expect(result).toEqual(mockEvent);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/events/${eventId}`, {
                method: 'GET',
                headers: headers,
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

            await expect(client.events.get(eventId, accountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/events/${eventId}`, {
                method: 'GET',
                headers,
            });
        });

    });

});
