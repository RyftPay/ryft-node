import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { Ryft } from '../../../src';
import { RyftError } from '../../../src/types/errors';
import {
  mockConversion,
  mockConversion_SellSideFees,
  mockInProgressConversion,
} from './mockData/mockConversion';
import {
  mockConversionRate,
  mockConversionRate_SellSideFees,
} from './mockData/mockConversionRate';
import {
  mockCreateConversionReq,
  mockCreateConversionReq_FixedSell,
} from './mockData/mockCreateConversionReq';

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

const mockJsonResponse = (body: object, ok = true, status = 200) =>
  mockedFetch.mockImplementation(async () =>
    Promise.resolve({
      json: async () => body,
      ok,
      status,
    } as Response),
  );

describe('conversions', () => {
  beforeEach(() => {
    global.fetch = mockedFetch;
  });

  describe('create', () => {
    test('success', async () => {
      mockJsonResponse(mockInProgressConversion);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.create(mockCreateConversionReq);

      expect(result).toEqual(mockInProgressConversion);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockCreateConversionReq),
        },
      );
    });

    test('success with fixed side', async () => {
      mockJsonResponse(mockInProgressConversion);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.create(
        mockCreateConversionReq_FixedSell,
      );

      expect(result).toEqual(mockInProgressConversion);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockCreateConversionReq_FixedSell),
        },
      );
    });

    test('success for sub account', async () => {
      mockJsonResponse(mockInProgressConversion);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.create(
        mockCreateConversionReq,
        'acc_123',
      );

      expect(result).toEqual(mockInProgressConversion);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'POST',
          headers: {
            ...defaultHeaders,
            Account: 'acc_123',
          },
          body: JSON.stringify(mockCreateConversionReq),
        },
      );
    });

    test('failure', async () => {
      mockJsonResponse(mockErrorResponse, false, 400);

      const client = new Ryft({ secretKey: mockSecretKey });

      await expect(
        client.conversions.create(mockCreateConversionReq),
      ).rejects.toThrow(RyftError);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'POST',
          headers: defaultHeaders,
          body: JSON.stringify(mockCreateConversionReq),
        },
      );
    });
  });

  describe('get', () => {
    const conversionId = 'con_01FCTS1XMKH9FF43CAFA4CXT3P';

    test('success', async () => {
      mockJsonResponse(mockConversion);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.get(conversionId);

      expect(result).toEqual(mockConversion);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/conversions/${conversionId}`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      );
    });

    test('success with sell-side fees', async () => {
      mockJsonResponse(mockConversion_SellSideFees);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.get(conversionId);

      expect(result).toEqual(mockConversion_SellSideFees);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/conversions/${conversionId}`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      );
    });

    test('success for sub account', async () => {
      mockJsonResponse(mockConversion);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.get(conversionId, 'acc_123');

      expect(result).toEqual(mockConversion);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/conversions/${conversionId}`,
        {
          method: 'GET',
          headers: {
            ...defaultHeaders,
            Account: 'acc_123',
          },
        },
      );
    });

    test('failure', async () => {
      mockJsonResponse(mockErrorResponse, false, 400);

      const client = new Ryft({ secretKey: mockSecretKey });

      await expect(client.conversions.get(conversionId)).rejects.toThrow(
        RyftError,
      );
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/conversions/${conversionId}`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      );
    });
  });

  describe('list', () => {
    test('success with defaults', async () => {
      const mockResponse = {
        items: [mockConversion],
      };

      mockJsonResponse(mockResponse);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.list();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      );
    });

    test('success with custom params', async () => {
      const mockResponse = {
        items: [mockConversion],
        paginationToken: 'con_01FCTS1XMKH9FF43CAFA4CXT3P',
      };

      mockJsonResponse(mockResponse);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.list(
        1631696701,
        1631696705,
        false,
        2,
        'con_01FCTS1XMKH9FF43CAFA4CXT3P',
        'acc_123',
      );

      const expectedUrl = new URL(
        'https://sandbox-api.ryftpay.com/v1/conversions',
      );
      expectedUrl.searchParams.append('startTimestamp', '1631696701');
      expectedUrl.searchParams.append('endTimestamp', '1631696705');
      expectedUrl.searchParams.append('ascending', 'false');
      expectedUrl.searchParams.append('limit', '2');
      expectedUrl.searchParams.append(
        'startsAfter',
        'con_01FCTS1XMKH9FF43CAFA4CXT3P',
      );

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          Account: 'acc_123',
        },
      });
    });

    test('failure', async () => {
      mockJsonResponse(mockErrorResponse, false, 400);

      const client = new Ryft({ secretKey: mockSecretKey });

      await expect(client.conversions.list()).rejects.toThrow(RyftError);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://sandbox-api.ryftpay.com/v1/conversions',
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      );
    });
  });

  describe('getRate', () => {
    test('success', async () => {
      mockJsonResponse(mockConversionRate);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.getRate('GBP', 'USD', 1000);

      const expectedUrl = new URL(
        'https://sandbox-api.ryftpay.com/v1/conversions/rate',
      );
      expectedUrl.searchParams.append('sellCurrency', 'GBP');
      expectedUrl.searchParams.append('buyCurrency', 'USD');
      expectedUrl.searchParams.append('amount', '1000');

      expect(result).toEqual(mockConversionRate);
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: defaultHeaders,
      });
    });

    test('success with sell-side fees', async () => {
      mockJsonResponse(mockConversionRate_SellSideFees);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.getRate('GBP', 'USD', 1000);

      const expectedUrl = new URL(
        'https://sandbox-api.ryftpay.com/v1/conversions/rate',
      );
      expectedUrl.searchParams.append('sellCurrency', 'GBP');
      expectedUrl.searchParams.append('buyCurrency', 'USD');
      expectedUrl.searchParams.append('amount', '1000');

      expect(result).toEqual(mockConversionRate_SellSideFees);
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: defaultHeaders,
      });
    });

    test('success for sub account', async () => {
      mockJsonResponse(mockConversionRate);

      const client = new Ryft({ secretKey: mockSecretKey });
      const result = await client.conversions.getRate(
        'GBP',
        'USD',
        1000,
        'acc_123',
      );

      const expectedUrl = new URL(
        'https://sandbox-api.ryftpay.com/v1/conversions/rate',
      );
      expectedUrl.searchParams.append('sellCurrency', 'GBP');
      expectedUrl.searchParams.append('buyCurrency', 'USD');
      expectedUrl.searchParams.append('amount', '1000');

      expect(result).toEqual(mockConversionRate);
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          Account: 'acc_123',
        },
      });
    });

    test('failure', async () => {
      mockJsonResponse(mockErrorResponse, false, 400);

      const client = new Ryft({ secretKey: mockSecretKey });

      await expect(
        client.conversions.getRate('GBP', 'GBP', 1000),
      ).rejects.toThrow(RyftError);

      const expectedUrl = new URL(
        'https://sandbox-api.ryftpay.com/v1/conversions/rate',
      );
      expectedUrl.searchParams.append('sellCurrency', 'GBP');
      expectedUrl.searchParams.append('buyCurrency', 'GBP');
      expectedUrl.searchParams.append('amount', '1000');

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: defaultHeaders,
      });
    });
  });
});
