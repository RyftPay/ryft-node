import { Balances } from '../types/balances/balances'
import { makeRequest } from '../utils/http'

export class BalancesClient {
  private readonly path = '/balances'

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async list(currency: string, account?: string): Promise<Balances> {
    return makeRequest({
      path: `${this.path}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        currency,
      },
      ...(account && { extraHeaders: { Account: account } }),
    })
  }
}
