import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockSubAccount } from './mockData/mockSubAccount';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import {
    mockCreateAccountRequest_HostedOnboardingBusiness,
    mockCreateAccountRequest_HostedOnboardingIndividual,
    mockCreateAccountRequest_HostedOnboardingMinimum,
    mockCreateAccountRequest_NonHostedOnboardingBusiness,
    mockCreateAccountRequest_NonHostedOnboardingIndividual,
    mockCreateAccountRequest_NonHostedOnboardingMinimum
} from './mockData/mockCreateAccountReq';
import { RyftError } from '../../../src/types/errors';
import { mockUpdateAccountRequest } from './mockData/mockUpdateAccountReq';
import { mockCreatePayoutReq } from './mockData/mockCreatePayoutReq';
import { mockCreateLinkRequest } from './mockData/mockCreateLinkReq';
import { mockPayout } from './mockData/mockPayout';
import { mockAccountAuthorization } from './mockData/mockAccountAuth';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('accounts', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success - hosted onboarding minimum', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_HostedOnboardingMinimum);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_HostedOnboardingMinimum),
            });
        });

        test('success - hosted onboarding business', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_HostedOnboardingBusiness);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_HostedOnboardingBusiness),
            });
        });

        test('success - hosted onboarding individual', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_HostedOnboardingIndividual);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_HostedOnboardingIndividual),
            });
        });

        test('success - non hosted onboarding minimum', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_NonHostedOnboardingMinimum);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_NonHostedOnboardingMinimum),
            });
        });

        test('success - non hosted onboarding business', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_NonHostedOnboardingBusiness);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_NonHostedOnboardingBusiness),
            });
        });

        test('success - non hosted onboarding individual', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.create(mockCreateAccountRequest_NonHostedOnboardingIndividual);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_NonHostedOnboardingIndividual),
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

            const client = new Ryft({ secretKey: 'sk_sandbox_123' });
            await expect(client.accounts.create(mockCreateAccountRequest_HostedOnboardingMinimum)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateAccountRequest_HostedOnboardingMinimum),
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.get(subAccountId);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.accounts.get(subAccountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('update', () => {

        test('success', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.update(subAccountId, mockUpdateAccountRequest);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateAccountRequest),
            });
        });

        test('failure', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.accounts.update(subAccountId, mockUpdateAccountRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}`, {
                method: 'PATCH',
                headers: defaultHeaders,
                body: JSON.stringify(mockUpdateAccountRequest),
            });
        });

    });

    describe('verify', () => {

        test('success', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockSubAccount,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.verify(subAccountId);

            expect(result).toEqual(mockSubAccount);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/verify`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });

        test('failure', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: 'sk_sandbox_123' });
            await expect(client.accounts.verify(subAccountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/verify`, {
                method: 'POST',
                headers: defaultHeaders,
            });
        });
    });

    describe('createPayout', () => {

        test('success', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayout,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.createPayout(subAccountId, mockCreatePayoutReq);

            expect(result).toEqual(mockPayout);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutReq),
            });
        });

        test('failure', async () => {
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: 'sk_sandbox_123' });
            await expect(client.accounts.createPayout(subAccountId, mockCreatePayoutReq)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreatePayoutReq),
            });
        });
    });

    describe('listPayouts', () => {

        test('success with defaults', async () => {
            const subAccountId = 'acc_123'

            const mockResponse = {
                items: [
                    mockPayout
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
            const result = await client.accounts.listPayouts(subAccountId);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const subAccountId = 'acc_123'

            const mockResponse = {
                items: [
                    mockPayout
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
            const result = await client.accounts.listPayouts(subAccountId, 123, 456, true, 20, 'abc');

            const expectedUrl = new URL(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts`);
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
            const subAccountId = 'acc_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );


            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.accounts.listPayouts(subAccountId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('getPayout', () => {

        test('success', async () => {
            const subAccountId = 'acc_123'
            const payoutId = 'po_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockPayout,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.getPayout(subAccountId, payoutId);

            expect(result).toEqual(mockPayout);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts/${payoutId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('failure', async () => {
            const subAccountId = 'acc_123'
            const payoutId = 'po_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.accounts.getPayout(subAccountId, payoutId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/${subAccountId}/payouts/${payoutId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });
    });

    describe('authorizeAccount', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockAccountAuthorization,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.accounts.createAuthLink(mockCreateLinkRequest);

            expect(result).toEqual(mockAccountAuthorization);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/accounts/authorize', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateLinkRequest),
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
            await expect(client.accounts.createAuthLink(mockCreateLinkRequest)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/accounts/authorize`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(mockCreateLinkRequest),
            });
        });
    });
});
