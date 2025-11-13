export interface TerminalLocation {
  id: string;
}

export interface TerminalDevice {
  type: string;
  serialNumber: string;
}

export type TerminalActionType = 'Transaction';

export type TerminalActionStatus = 'InProgress' | 'Cancelled' | 'Failed' | 'Succeeded';

export interface TerminalActionAmounts {
  requested: number;
}

export interface TerminalActionTransactionSettings {
  receiptPrintingSource?: 'Terminal' | 'PointOfSale';
}

export interface TerminalActionError {
  code: string;
  settings?: TerminalActionTransactionSettings;
}

export interface TerminalActionTransaction {
  type: 'Payment' | 'Refund';
  paymentSessionId: string;
  amounts: TerminalActionAmounts;
  currency: string;
  settings?: TerminalActionTransactionSettings;
}

export interface TerminalAction {
  type: TerminalActionType;
  status: TerminalActionStatus;
  id: string;
  error?: TerminalActionError | null;
  transaction?: TerminalActionTransaction | null;
  createdTimestamp?: number;
  completedTimestamp?: number;
}

export interface Terminal {
  id: string;
  name?: string;
  location: TerminalLocation;
  device: TerminalDevice;
  action?: TerminalAction;
  metadata?: Record<string, string>;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface Terminals {
  items: Terminal[];
  paginationToken?: string;
}

export interface TerminalDeleted {
  id: string;
}