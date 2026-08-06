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
  /**
   * The FX fees charged on the sell side. The fee is charged on exactly one
   * side, so this is mutually exclusive with `buy.fees`.
   */
  fees?: ConversionFees | null | undefined;
}

export interface ConversionBuy {
  amount?: number | null | undefined;
  currency: string;
  /**
   * The FX fees charged on the buy side. The fee is charged on exactly one
   * side, so this is mutually exclusive with `sell.fees`.
   */
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
  /**
   * The FX fees that would be charged on the sell side. The fee is charged on
   * exactly one side, so this is mutually exclusive with `buy.fees`.
   */
  fees?: ConversionFees | null | undefined;
}

export interface ConversionRateBuy {
  amount: number;
  currency: string;
  /**
   * The FX fees that would be charged on the buy side. The fee is charged on
   * exactly one side, so this is mutually exclusive with `sell.fees`.
   */
  fees?: ConversionFees | null | undefined;
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
