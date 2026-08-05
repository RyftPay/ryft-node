import {
  Conversion,
  ConversionRate,
  Conversions,
} from '../types/conversions/conversions';
import { CreateConversionRequest } from '../types/conversions/req';
import { makeRequest } from '../utils/http';

/**
 * A Conversion represents the exchange of a balance held in one currency for another.
 * Docs: https://api-reference.ryftpay.com/#tag/Conversions
 */
export class ConversionsClient {
  private readonly path = '/conversions';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async create(
    request: CreateConversionRequest,
    account?: string,
  ): Promise<Conversion> {
    return makeRequest({
      path: this.path,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: {
        ...request,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async get(id: string, account?: string): Promise<Conversion> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  /**
   * `startTimestamp` and `endTimestamp` are inclusive Unix-second bounds and must be supplied together.
   */
  async list(
    startTimestamp?: number,
    endTimestamp?: number,
    ascending?: boolean,
    limit?: number,
    startsAfter?: string,
    account?: string,
  ): Promise<Conversions> {
    return makeRequest({
      path: this.path,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        startTimestamp,
        endTimestamp,
        ascending,
        limit,
        startsAfter,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  /**
   * Fetches an indicative rate for converting `amount` of `sellCurrency` into `buyCurrency`.
   * The rate is not held - the rate applied when creating a conversion may differ.
   *
   * @param amount the amount (in minor units) of `sellCurrency` to convert
   */
  async getRate(
    sellCurrency: string,
    buyCurrency: string,
    amount: number,
    account?: string,
  ): Promise<ConversionRate> {
    return makeRequest({
      path: `${this.path}/rate`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: {
        sellCurrency,
        buyCurrency,
        amount,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }
}
