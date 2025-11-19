import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockLocation } from './mockData/mockLocation';
import { mockCreateLocationReq } from './mockData/mockCreateLocationReq';
import { mockUpdateLocationReq } from './mockData/mockUpdateLocationReq';
import {
  defaultHeaders,
  mockErrorResponse,
  mockSecretKey,
} from '../mockData';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('inPersonLocations', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('create', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockLocation,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonLocations.create(
        mockCreateLocationReq,
      );

      expect(result).toEqual(mockLocation);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/locations',
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockCreateLocationReq),
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
      await expect(
        client.inPersonLocations.create(mockCreateLocationReq),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('list', () => {
    test('success with defaults', async () => {
      const mockResponse = {
        items: [mockLocation],
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
      const result = await client.inPersonLocations.list();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/locations',
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
      await expect(client.inPersonLocations.list()).rejects.toThrow(RyftError);
    });
  });

  describe('get', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockLocation,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonLocations.get(mockLocation.id);

      expect(result).toEqual(mockLocation);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/locations/${mockLocation.id}`,
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
        client.inPersonLocations.get(mockLocation.id),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('update', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockLocation,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonLocations.update(
        mockLocation.id,
        mockUpdateLocationReq,
      );

      expect(result).toEqual(mockLocation);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/locations/${mockLocation.id}`,
        {
          method: 'PATCH',
          headers: defaultHeaders,
          body: JSON.stringify(mockUpdateLocationReq),
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
      await expect(
        client.inPersonLocations.update(mockLocation.id, mockUpdateLocationReq),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('delete', () => {
    test('success', async () => {
      const mockDeleted = { id: mockLocation.id };

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockDeleted,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonLocations.delete(mockLocation.id);

      expect(result).toEqual(mockDeleted);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/locations/${mockLocation.id}`,
        {
          method: 'DELETE',
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
      await expect(
        client.inPersonLocations.delete(mockLocation.id),
      ).rejects.toThrow(RyftError);
    });
  });
});