import { ConversionRate } from '../../../../src';

export const mockConversionRate: ConversionRate = {
  sell: {
    amount: 1000,
    currency: 'GBP',
  },
  buy: {
    amount: 1247,
    currency: 'USD',
    fees: {
      ryft: {
        amount: 10,
      },
      platform: {
        amount: 5,
        ryftFee: {
          amount: 2,
        },
      },
    },
  },
  rate: 1.247,
  estimatedSettlementDate: '2024-03-15',
};

export const mockConversionRate_SellSideFees: ConversionRate = {
  sell: {
    amount: 1000,
    currency: 'GBP',
    fees: {
      ryft: {
        amount: 10,
      },
    },
  },
  buy: {
    amount: 1234,
    currency: 'USD',
  },
  rate: 1.247,
  estimatedSettlementDate: '2024-03-15',
};
