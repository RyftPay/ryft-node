import {
  InPersonProductSku,
  InPersonProductSkus,
} from '../types/inPerson/skus';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person product SKUs for terminal payments
 * Docs: https://api-reference.ryftpay.com
 */
export class InPersonSkusClient {
  private readonly path = '/in-person/skus';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async list(
    country: string,
    limit?: number,
    startsAfter?: string,
    productId?: string,
    account?: string,
  ): Promise<InPersonProductSkus> {
    return makeRequest({
      path: this.path,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        country,
        limit,
        startsAfter,
        productId,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async get(id: string, account?: string): Promise<InPersonProductSku> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }
}
