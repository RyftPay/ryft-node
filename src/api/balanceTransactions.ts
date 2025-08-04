import { BalanceTransactions } from '../types/balanceTransactions/balanceTransactions'
import { makeRequest } from '../utils/http'

export class BalanceTransactionsClient {
  private readonly path = '/balance-transactions'

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async list(
    limit?: number,
    startsAfter?: string,
    payoutId?: string,
    account?: string,
  ): Promise<BalanceTransactions> {
    return makeRequest({
      path: `${this.path}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        limit,
        startsAfter,
        payoutId,
      },
      ...(account && { extraHeaders: { Account: account } }),
    })
  }
}
