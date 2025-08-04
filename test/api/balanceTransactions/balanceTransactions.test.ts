import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData'
import { Ryft } from '../../../src'
import { RyftError } from '../../../src/types/errors'
import { mockBalanceTransaction } from './mockData/mockBalanceTransaction'

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>

describe('balanceTransactions', () => {
  beforeEach(() => {
    global.fetch = mockedFetch
  })

  describe('list', () => {
    test('success with defaults', async () => {
      const mockResponse = {
        items: [mockBalanceTransaction],
      }

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockResponse,
          ok: true,
          status: 200,
        } as Response),
      )

      const client = new Ryft({ secretKey: mockSecretKey })
      const result = await client.balanceTransactions.list()

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/balance-transactions`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      )
    })

    test('success with custom params', async () => {
      const mockResponse = {
        items: [mockBalanceTransaction],
      }

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockResponse,
          ok: true,
          status: 200,
        } as Response),
      )

      const client = new Ryft({ secretKey: mockSecretKey })
      const result = await client.balanceTransactions.list(20, 'abc', 'po_123')

      const expectedUrl = new URL(
        `https://sandbox-api.ryftpay.com/v1/balance-transactions`,
      )
      expectedUrl.searchParams.append('limit', '20')
      expectedUrl.searchParams.append('startsAfter', 'abc')
      expectedUrl.searchParams.append('payoutId', 'po_123')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
        method: 'GET',
        headers: defaultHeaders,
      })
    })

    test('failure', async () => {
      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockErrorResponse,
          ok: false,
          status: 400,
        } as Response),
      )

      const client = new Ryft({ secretKey: mockSecretKey })

      await expect(client.balanceTransactions.list()).rejects.toThrow(RyftError)
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/balance-transactions`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      )
    })
  })
})
