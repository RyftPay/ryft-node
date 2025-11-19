import { InPersonOrder, InPersonOrders } from '../types/inPerson/orders';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person orders for terminal payments
 * Docs: https://api-reference.ryftpay.com/#tag/In-Person-Orders
 */
export class InPersonOrdersClient {
  private readonly path = '/in-person/orders';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async list(
    ascending?: boolean,
    limit?: number,
    startsAfter?: string,
    account?: string,
  ): Promise<InPersonOrders> {
    return makeRequest({
      path: this.path,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        ascending,
        limit,
        startsAfter,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async get(id: string, account?: string): Promise<InPersonOrder> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }
}
