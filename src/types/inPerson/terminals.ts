export interface TerminalLocation {
  id: string;
}

export interface TerminalDevice {
  serialNumber: string;
  model?: string;
  status?: string;
}

export interface TerminalAction {
  type?: string;
  status?: string;
  createdTimestamp?: number;
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