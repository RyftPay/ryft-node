import {
  InPersonLocation,
  InPersonLocationDeleted,
  InPersonLocations,
} from '../types/inPerson/locations';
import {
  CreateInPersonLocationRequest,
  UpdateInPersonLocationRequest,
} from '../types/inPerson/locationsReq';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person locations for terminal payments
 * Docs: https://api-reference.ryftpay.com/#tag/In-Person-Locations
 */
export class InPersonLocationsClient {
  private readonly path = '/in-person/locations';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async create(
    request: CreateInPersonLocationRequest,
    account?: string,
  ): Promise<InPersonLocation> {
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

  async list(
    ascending?: boolean,
    limit?: number,
    startsAfter?: string,
    account?: string,
  ): Promise<InPersonLocations> {
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

  async get(id: string, account?: string): Promise<InPersonLocation> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async update(
    id: string,
    request: UpdateInPersonLocationRequest,
    account?: string,
  ): Promise<InPersonLocation> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'PATCH',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: {
        ...request,
      },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async delete(
    id: string,
    account?: string,
  ): Promise<InPersonLocationDeleted> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'DELETE',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }
}
