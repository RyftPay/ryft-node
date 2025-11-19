import { InPersonProduct, InPersonProducts } from '../types/inPerson/products';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person products for terminal payments
 * Docs: https://api-reference.ryftpay.com/#tag/In-Person-Products
 */
export class InPersonProductsClient {
  private readonly path = '/in-person/products';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async list(
    ascending?: boolean,
    limit?: number,
    startsAfter?: string,
  ): Promise<InPersonProducts> {
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
    });
  }

  async get(id: string): Promise<InPersonProduct> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
    });
  }
}
