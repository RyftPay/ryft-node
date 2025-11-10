import { Terminal, TerminalDeleted, Terminals } from '../types/inPerson/terminals';
import {
  CreateTerminalRequest,
  TerminalConfirmReceiptRequest,
  TerminalPaymentRequest,
  TerminalRefundRequest,
  UpdateTerminalRequest,
} from '../types/inPerson/terminalsReq';
import { makeRequest } from '../utils/http';

/**
 * Manage in-person terminals for terminal payments
 * Docs: https://api-reference.ryftpay.com
 */
export class InPersonTerminalsClient {
  private readonly path = '/in-person/terminals';

  constructor(
    private readonly secretKey: string,
    private readonly baseUrl: string,
  ) {}

  async create(
    request: CreateTerminalRequest,
    account?: string,
  ): Promise<Terminal> {
    return makeRequest({
      path: this.path,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: { ...request },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async list(
    ascending?: boolean,
    limit?: number,
    startsAfter?: string,
    account?: string,
  ): Promise<Terminals> {
    return makeRequest({
      path: this.path,
      method: 'GET',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      queryParams: { ascending, limit, startsAfter },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async get(id: string, account?: string): Promise<Terminal> {
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
    request: UpdateTerminalRequest,
    account?: string,
  ): Promise<Terminal> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'PATCH',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: { ...request },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async delete(id: string, account?: string): Promise<TerminalDeleted> {
    return makeRequest({
      path: `${this.path}/${id}`,
      method: 'DELETE',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async initiatePayment(
    id: string,
    request: TerminalPaymentRequest,
    account?: string,
  ): Promise<Terminal> {
    return makeRequest({
      path: `${this.path}/${id}/payment`,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: { ...request },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async initiateRefund(
    id: string,
    request: TerminalRefundRequest,
    account?: string,
  ): Promise<Terminal> {
    return makeRequest({
      path: `${this.path}/${id}/refund`,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: { ...request },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async cancelAction(id: string, account?: string): Promise<Terminal> {
    return makeRequest({
      path: `${this.path}/${id}/cancel-action`,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      ...(account && { extraHeaders: { Account: account } }),
    });
  }

  async confirmReceipt(
    id: string,
    request: TerminalConfirmReceiptRequest,
    account?: string,
  ): Promise<Terminal> {
    return makeRequest({
      path: `${this.path}/${id}/confirm-receipt`,
      method: 'POST',
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      body: { ...request },
      ...(account && { extraHeaders: { Account: account } }),
    });
  }
}