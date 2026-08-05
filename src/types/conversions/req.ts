export interface CreateConversionRequest {
  /**
   * The currency to convert from, and how much of it to convert.
   */
  sell: ConversionSellRequest;

  /**
   * The currency to convert to. The amount you receive is derived from the rate at the
   * time the conversion is created, so it cannot be specified.
   */
  buy: ConversionBuyRequest;

  /**
   * Must be `true` to confirm you accept the terms of the conversion.
   */
  termAgreement: boolean;

  /**
   * Which side of the conversion `sell.amount` fixes. Only `Sell` is currently supported,
   * which is also the default when omitted.
   */
  fixedSide?: 'Sell' | null | undefined;

  /**
   * An optional reason describing why the conversion was initiated. Not required but recommended.
   */
  reason?: string | null | undefined;
}

export interface ConversionSellRequest {
  /**
   * The three-letter ISO currency code to convert from. Must differ from the `buy` currency.
   */
  currency: string;

  /**
   * The amount (in minor units) to convert. Must be greater than 0. Each currency has its
   * own minimum and maximum.
   */
  amount: number;
}

export interface ConversionBuyRequest {
  /**
   * The three-letter ISO currency code to convert to. Must differ from the `sell` currency.
   */
  currency: string;
}
