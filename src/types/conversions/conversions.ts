export type ConversionStatus = 'InProgress' | 'Settled';

export interface ConversionFee {
  amount: number;
}

export interface ConversionPlatformFeeDetail {
  amount: number;
  ryftFee: ConversionFee;
}

export interface ConversionFees {
  ryft?: ConversionFee | null | undefined;
  platform?: ConversionPlatformFeeDetail | null | undefined;
}

export interface ConversionSell {
  amount?: number | null | undefined;
  currency: string;
}

export interface ConversionBuy {
  amount?: number | null | undefined;
  currency: string;
  fees?: ConversionFees | null | undefined;
}

export interface ConversionCreatedBy {
  id: string;
  name?: string | null | undefined;
}

export interface Conversion {
  id: string;
  sell: ConversionSell;
  buy: ConversionBuy;
  rate?: number | null | undefined;
  status: ConversionStatus;
  reason?: string | null | undefined;
  /**
   * The date the converted funds are expected to settle, in `yyyy-MM-dd` format.
   */
  estimatedSettlementDate?: string | null | undefined;
  settledTimestamp?: number | null | undefined;
  createdBy?: ConversionCreatedBy | null | undefined;
  createdTimestamp: number;
}

export interface Conversions {
  items: Conversion[];
  paginationToken?: string | null | undefined;
}

export interface ConversionRateSell {
  amount: number;
  currency: string;
}

export interface ConversionRateBuy {
  amount: number;
  currency: string;
  fees: ConversionFees;
}

export interface ConversionRate {
  sell: ConversionRateSell;
  buy: ConversionRateBuy;
  rate: number;
  /**
   * The date the converted funds would be expected to settle, in `yyyy-MM-dd` format.
   */
  estimatedSettlementDate?: string | null | undefined;
}
