export interface TerminalLocation {
  id: string;
}

export interface TerminalDevice {
  type: string;
  serialNumber: string;
}

export type TerminalActionType = 'Transaction';

export type TerminalActionStatus = 'InProgress' | 'Cancelled' | 'Failed' | 'Succeeded';

export type TerminalActionReceiptStatus =
  | 'NotRequired'
  | 'Required'
  | 'Succeeded'
  | 'Failed';

export interface TerminalActionAmounts {
  requested: number;
}

export interface TerminalActionTransactionSettings {
  receiptPrintingSource?: 'Terminal' | 'PointOfSale' | null | undefined;
}

export interface TerminalActionError {
  code: string;
  settings?: TerminalActionTransactionSettings | null | undefined;
}

export interface TerminalActionTransaction {
  type: 'Payment' | 'Refund';
  paymentSessionId: string;
  amounts: TerminalActionAmounts;
  currency: string;
  receiptDetail?: TerminalActionReceiptDetail | null | undefined;
  settings?: TerminalActionTransactionSettings | null | undefined;
}

export interface TerminalActionReceipt {
  status: TerminalActionReceiptStatus;
}

export interface TerminalActionReceiptDetail {
  customerCopy?: TerminalActionReceipt | null | undefined;
  merchantCopy?: TerminalActionReceipt | null | undefined;
}

export interface TerminalAction {
  type: TerminalActionType;
  status: TerminalActionStatus;
  id: string;
  error?: TerminalActionError | null | undefined;
  transaction?: TerminalActionTransaction | null | undefined;
  createdTimestamp?: number | null | undefined;
  completedTimestamp?: number | null | undefined;
}

export interface Terminal {
  id: string;
  name?: string | null | undefined;
  location: TerminalLocation;
  device: TerminalDevice;
  action?: TerminalAction | null | undefined;
  metadata?: Record<string, string> | null | undefined;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface Terminals {
  items: Terminal[];
  paginationToken?: string | null | undefined;
}

export interface TerminalDeleted {
  id: string;
}
