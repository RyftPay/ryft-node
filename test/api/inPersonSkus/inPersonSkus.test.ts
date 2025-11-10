import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockSku } from './mockData/mockSku';
import {
  defaultHeaders,
  mockErrorResponse,
  mockSecretKey,
} from '../mockData';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('inPersonSkus', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('list', () => {
    test('success with required country parameter', async () => {
      const mockResponse = {
        items: [mockSku],
        paginationToken: 'token123',
      };

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockResponse,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonSkus.list('GB');

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/skus?country=GB',
        {
          method: 'GET',
          headers: defaultHeaders,
          body: undefined,
        },
      );
    });

    test('success with all parameters', async () => {
      const mockResponse = {
        items: [mockSku],
        paginationToken: 'token123',
      };

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockResponse,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonSkus.list(
        'GB',
        25,
        'token456',
        'ippd_123',
        'acc_123',
      );

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/skus?country=GB&limit=25&startsAfter=token456&productId=ippd_123',
        {
          method: 'GET',
          headers: {
            ...defaultHeaders,
            Account: 'acc_123',
          },
          body: undefined,
        },
      );
    });

    test('failure', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockErrorResponse,
          ok: false,
          status: 400,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      await expect(client.inPersonSkus.list('GB')).rejects.toThrow(RyftError);
    });
  });

  describe('get', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockSku,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonSkus.get(mockSku.id);

      expect(result).toEqual(mockSku);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/skus/${mockSku.id}`,
        {
          method: 'GET',
          headers: defaultHeaders,
          body: undefined,
        },
      );
    });

    test('success with account parameter', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockSku,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonSkus.get(mockSku.id, 'acc_123');

      expect(result).toEqual(mockSku);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/skus/${mockSku.id}`,
        {
          method: 'GET',
          headers: {
            ...defaultHeaders,
            Account: 'acc_123',
          },
          body: undefined,
        },
      );
    });

    test('failure', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockErrorResponse,
          ok: false,
          status: 404,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      await expect(client.inPersonSkus.get(mockSku.id)).rejects.toThrow(
        RyftError,
      );
    });
  });
});