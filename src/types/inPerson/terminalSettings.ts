export type TerminalReceiptPrintingSource = 'Terminal' | 'PointOfSale';

export interface TerminalTransactionSettings {
  receiptPrintingSource?: TerminalReceiptPrintingSource | null | undefined;
}

export interface PaymentMethodOptionSettings {
  disabled?: string[] | null | undefined;
}

export interface FeeAllocationRequestItem {
  bookTo: string;
}

export interface PaymentFeeAllocationSettings {
  interchange?: FeeAllocationRequestItem | null | undefined;
  network?: FeeAllocationRequestItem | null | undefined;
  miscPassThrough?: FeeAllocationRequestItem | null | undefined;
  processor?: FeeAllocationRequestItem | null | undefined;
  gateway?: FeeAllocationRequestItem | null | undefined;
  combined?: FeeAllocationRequestItem | null | undefined;
}

export interface PaymentPlatformSettings {
  paymentFees?: PaymentFeeAllocationSettings | null | undefined;
}

export interface PaymentSettings {
  paymentMethodOptions?: PaymentMethodOptionSettings | null | undefined;
  platform?: PaymentPlatformSettings | null | undefined;
}
