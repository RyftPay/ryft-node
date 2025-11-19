import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockProduct } from './mockData/mockProduct';
import {
  defaultHeaders,
  mockErrorResponse,
  mockSecretKey,
} from '../mockData';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('inPersonProducts', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('list', () => {
    test('success with default parameters', async () => {
      const mockResponse = {
        items: [mockProduct],
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
      const result = await client.inPersonProducts.list();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/products',
        {
          method: 'GET',
          headers: defaultHeaders,
          body: undefined,
        },
      );
    });

    test('success with all parameters', async () => {
      const mockResponse = {
        items: [mockProduct],
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
      const result = await client.inPersonProducts.list(true, 25, 'token456');

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/products?ascending=true&limit=25&startsAfter=token456',
        {
          method: 'GET',
          headers: defaultHeaders,
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
      await expect(client.inPersonProducts.list()).rejects.toThrow(RyftError);
    });
  });

  describe('get', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockProduct,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonProducts.get(mockProduct.id);

      expect(result).toEqual(mockProduct);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/products/${mockProduct.id}`,
        {
          method: 'GET',
          headers: defaultHeaders,
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
      await expect(
        client.inPersonProducts.get(mockProduct.id),
      ).rejects.toThrow(RyftError);
    });
  });
});
