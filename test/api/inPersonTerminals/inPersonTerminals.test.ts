import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import { mockTerminal } from './mockData/mockTerminal';
import { mockCreateTerminalReq } from './mockData/mockCreateTerminalReq';
import { mockUpdateTerminalReq } from './mockData/mockUpdateTerminalReq';
import { mockPaymentReq } from './mockData/mockPaymentReq';
import { mockRefundReq } from './mockData/mockRefundReq';
import {
  defaultHeaders,
  mockErrorResponse,
  mockSecretKey,
} from '../mockData';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

describe('inPersonTerminals', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('create', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.create(
        mockCreateTerminalReq,
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/terminals',
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockCreateTerminalReq),
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
        client.inPersonTerminals.create(mockCreateTerminalReq),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('list', () => {
    test('success', async () => {
      const mockResponse = {
        items: [mockTerminal],
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
      const result = await client.inPersonTerminals.list();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/in-person/terminals',
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
      await expect(client.inPersonTerminals.list()).rejects.toThrow(RyftError);
    });
  });

  describe('get', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.get(mockTerminal.id);

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}`,
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
        client.inPersonTerminals.get(mockTerminal.id),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('update', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.update(
        mockTerminal.id,
        mockUpdateTerminalReq,
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}`,
        {
          method: 'PATCH',
          headers: defaultHeaders,
          body: JSON.stringify(mockUpdateTerminalReq),
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
        client.inPersonTerminals.update(mockTerminal.id, mockUpdateTerminalReq),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('delete', () => {
    test('success', async () => {
      const mockDeleted = { id: mockTerminal.id };

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockDeleted,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.delete(mockTerminal.id);

      expect(result).toEqual(mockDeleted);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}`,
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
        client.inPersonTerminals.delete(mockTerminal.id),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('initiatePayment', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.initiatePayment(
        mockTerminal.id,
        mockPaymentReq,
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}/payment`,
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockPaymentReq),
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
        client.inPersonTerminals.initiatePayment(
          mockTerminal.id,
          mockPaymentReq,
        ),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('initiateRefund', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.initiateRefund(
        mockTerminal.id,
        mockRefundReq,
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}/refund`,
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockRefundReq),
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
        client.inPersonTerminals.initiateRefund(mockTerminal.id, mockRefundReq),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('cancelAction', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.cancelAction(
        mockTerminal.id,
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}/cancel-action`,
        {
          method: 'POST',
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
        client.inPersonTerminals.cancelAction(mockTerminal.id),
      ).rejects.toThrow(RyftError);
    });
  });

  describe('confirmReceipt', () => {
    test('success', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockTerminal,
          ok: true,
          status: 200,
        } as Response),
      );

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.inPersonTerminals.confirmReceipt(
        mockTerminal.id,
        { customerCopy: { status: 'Succeeded' } },
      );

      expect(result).toEqual(mockTerminal);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/in-person/terminals/${mockTerminal.id}/confirm-receipt`,
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify({ customerCopy: { status: 'Succeeded' } }),
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
        client.inPersonTerminals.confirmReceipt(mockTerminal.id, {
          customerCopy: { status: 'Succeeded' },
        }),
      ).rejects.toThrow(RyftError);
    });
  });
});
