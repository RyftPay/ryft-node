import {
  InPersonProductSku,
  InPersonProductSkus,
} from '../types/inPerson/skus';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person product SKUs for terminal payments
 * Docs: https://api-reference.ryftpay.com/#tag/In-Person-SKUs
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
    });
  }

  async get(id: string): Promise<InPersonProductSku> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
    });
  }
}
