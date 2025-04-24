import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockDispute } from './mockData/mockDispute';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { mockDeleteEvidenceRequest } from './mockData/mockDeleteEvidenceReq';
import { mockAddEvidenceRequest } from './mockData/mockAddEvidenceReq';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('disputes', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [
                    mockDispute
                ]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/disputes', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [
                    mockDispute
                ]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.list(123, 456, true, 20, 'abc');

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/disputes');
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

            await expect(client.disputes.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/disputes', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });


    describe('get', () => {

        test('success', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockDispute,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.get(disputeId);

            expect(result).toEqual(mockDispute);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const disputeId = 'dis_123'

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

            await expect(client.disputes.get(disputeId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('accept', () => {

        test('success', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockDispute,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.accept(disputeId);

            expect(result).toEqual(mockDispute);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/accept`, {
                method: 'POST',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const disputeId = 'dis_123'

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

            await expect(client.disputes.accept(disputeId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/accept`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });

    });

    describe('challenge', () => {

        test('success', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockDispute,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.challenge(disputeId);

            expect(result).toEqual(mockDispute);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/challenge`, {
                method: 'POST',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.disputes.challenge(disputeId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/challenge`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });

    });

    describe('addEvidence', () => {

        test('success', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockDispute,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.addEvidence(disputeId, mockAddEvidenceRequest);

            expect(result).toEqual(mockDispute);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/evidence`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockAddEvidenceRequest),
            });

        });

        test('failure', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.disputes.addEvidence(disputeId, mockAddEvidenceRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/evidence`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockAddEvidenceRequest),
            });
        });

    });

    describe('removeEvidence', () => {

        test('success', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockDispute,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.disputes.deleteEvidence(disputeId, mockDeleteEvidenceRequest);

            expect(result).toEqual(mockDispute);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/evidence`, {
                method: 'DELETE',
                headers: defaultHeaders,
                body: JSON.stringify(mockDeleteEvidenceRequest),
            });

        });

        test('failure', async () => {
            const disputeId = 'dis_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.disputes.deleteEvidence(disputeId, mockDeleteEvidenceRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/disputes/${disputeId}/evidence`, {
                method: 'DELETE',
                headers: defaultHeaders,
                body: JSON.stringify(mockDeleteEvidenceRequest),
            });
        });

    });
});
