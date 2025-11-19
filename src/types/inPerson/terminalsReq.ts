import {
  PaymentSettings,
  TerminalTransactionSettings,
} from './terminalSettings';

export interface CreateTerminalRequest {
  serialNumber: string;
  locationId: string;
  name?: string | null | undefined;
  metadata?: Record<string, string> | null | undefined;
}

export interface UpdateTerminalRequest {
  locationId?: string | null | undefined;
  name?: string | null | undefined;
  metadata?: Record<string, string> | null | undefined;
}

export interface TerminalPaymentRequest {
  amounts: {
    requested: number;
  };
  currency: string;
  paymentSession?: {
    platformFee?: number | null | undefined;
    metadata?: Record<string, string> | null | undefined;
    paymentSettings?: PaymentSettings | null | undefined;
  } | null | undefined;
  settings?: TerminalTransactionSettings | null | undefined;
}

export interface TerminalRefundRequest {
  paymentSession: {
    id: string;
  };
  amount?: number | null | undefined;
  refundPlatformFee?: boolean | null | undefined;
  settings?: TerminalTransactionSettings | null | undefined;
}

export interface TerminalConfirmReceiptRequest {
  customerCopy?: {
    status: 'Succeeded' | 'Failed';
  } | null | undefined;
  merchantCopy?: {
    status: 'Succeeded' | 'Failed';
  } | null | undefined;
}
