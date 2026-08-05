import { CreateConversionRequest } from '../../../../src/types/conversions/req';

export const mockCreateConversionReq: CreateConversionRequest = {
  sell: {
    currency: 'GBP',
    amount: 500,
  },
  buy: {
    currency: 'EUR',
  },
  termAgreement: true,
  reason: 'Paying EUR suppliers',
};

export const mockCreateConversionReq_FixedSell: CreateConversionRequest = {
  sell: {
    currency: 'GBP',
    amount: 500,
  },
  buy: {
    currency: 'EUR',
  },
  termAgreement: true,
  fixedSide: 'Sell',
};
