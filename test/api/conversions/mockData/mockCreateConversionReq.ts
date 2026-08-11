import { CreateConversionRequest } from '../../../../src';

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
