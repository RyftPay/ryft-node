import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockAccountLink } from './mockData/mockAccountLinks';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const accountId = 'account-id';
const redirectUrl = 'http://redirect-url.com';

describe('accountLinks', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('generateTemporaryAccountLink', () => {

        test('success', async () => {

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockAccountLink,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});
            const result = await client.accountLinks.generateTemporaryAccountLink(accountId, redirectUrl);

            expect(result).toEqual(mockAccountLink);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/account-links', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({ accountId, redirectUrl })
            });
        });

        test('failure', async () => {
            const accountId = 'account-id';
            const redirectUrl = 'not-a-url';

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey});

            await expect(client.accountLinks.generateTemporaryAccountLink(accountId, redirectUrl)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/account-links', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({ accountId, redirectUrl })
            });
        });

    });

});
