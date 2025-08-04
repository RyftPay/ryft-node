import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData'
import { Ryft } from '../../../src'
import { RyftError } from '../../../src/types/errors'
import { mockBalance } from './mockData/mockBalance'

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>

describe('balances', () => {
  beforeEach(() => {
    global.fetch = mockedFetch
  })

  describe('list', () => {
    test('success with defaults', async () => {
      const mockResponse = {
        items: [mockBalance],
      }

      mockedFetch.mockImplementation(async () =>
        Promise.resolve({
          json: async () => mockResponse,
          ok: true,
          status: 200,
        } as Response),
      )

      const client = new Ryft({ secretKey: mockSecretKey })
      const result = await client.balances.list('GBP')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/balances?currency=GBP`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      )
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

      await expect(client.balances.list('GBP')).rejects.toThrow(RyftError)
      expect(global.fetch).toHaveBeenCalledWith(
        `https://sandbox-api.ryftpay.com/v1/balances?currency=GBP`,
        {
          method: 'GET',
          headers: defaultHeaders,
        },
      )
    })
  })
})
