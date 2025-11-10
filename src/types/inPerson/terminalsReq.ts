import {
  PaymentSettings,
  TerminalTransactionSettings,
} from './terminalSettings';

export interface CreateTerminalRequest {
  serialNumber: string;
  locationId: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface UpdateTerminalRequest {
  locationId?: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface TerminalPaymentRequest {
  amounts: {
    requested: number;
  };
  currency: string;
  paymentSession?: {
    platformFee?: number;
    metadata?: Record<string, string>;
    paymentSettings?: PaymentSettings;
  };
  settings?: TerminalTransactionSettings;
}

export interface TerminalRefundRequest {
  paymentSession: {
    id: string;
    amount?: number;
  };
  refundPlatformFee?: boolean;
  settings?: TerminalTransactionSettings;
}

export interface TerminalConfirmReceiptRequest {
  customerCopy?: {
    status: 'Succeeded' | 'Failed';
  };
  merchantCopy?: {
    status: 'Succeeded' | 'Failed';
  };
}