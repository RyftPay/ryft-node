export type TerminalReceiptPrintingSource = 'Terminal' | 'PointOfSale';

export interface TerminalTransactionSettings {
  receiptPrintingSource?: TerminalReceiptPrintingSource;
}

export interface PaymentMethodOptionSettings {
  disabled?: string[];
}

export interface PaymentPlatformSettings {
  subAccountId?: string;
}

export interface PaymentSettings {
  paymentMethodOptions?: PaymentMethodOptionSettings;
  platform?: PaymentPlatformSettings;
}