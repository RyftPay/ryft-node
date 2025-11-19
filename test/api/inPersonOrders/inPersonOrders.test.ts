import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockOrder } from './mockData/mockOrder';
import {
  defaultHeaders,
  mockErrorResponse,
  mockSecretKey,
} from '../mockData';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('inPersonOrders', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('list', () => {
    test('success with default parameters', async () => {
      const mockResponse = {
        items: [mockOrder],
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
      const result = await client.inPersonOrders.list();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/orders',
        {
          method: 'GET',
          headers: defaultHeaders,
          body: undefined,
        },
      );
    });

    test('success with all parameters', async () => {
      const mockResponse = {
        items: [mockOrder],
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
      const result = await client.inPersonOrders.list(
        true,
        25,
        'token456',
        'acc_123',
      );

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/orders?ascending=true&limit=25&startsAfter=token456',
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
      await expect(client.inPersonOrders.list()).rejects.toThrow(RyftError);
    });
  });

  describe('get', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockOrder,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonOrders.get(mockOrder.id);

      expect(result).toEqual(mockOrder);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/orders/${mockOrder.id}`,
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
          json: async () => mockOrder,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonOrders.get(mockOrder.id, 'acc_123');

      expect(result).toEqual(mockOrder);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/orders/${mockOrder.id}`,
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
      await expect(client.inPersonOrders.get(mockOrder.id)).rejects.toThrow(
        RyftError,
      );
    });
  });
});