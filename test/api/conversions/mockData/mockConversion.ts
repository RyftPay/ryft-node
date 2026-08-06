import { Conversion } from '../../../../src';

export const mockConversion: Conversion = {
  id: 'con_01FCTS1XMKH9FF43CAFA4CXT3P',
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
  status: 'Settled',
  reason: 'Converting GBP takings to pay USD suppliers',
  estimatedSettlementDate: '2024-03-15',
  settledTimestamp: 1470989600,
  createdBy: {
    id: 'ac_b83f2653-06d7-44a9-a548-5825e8186004',
    name: 'Acme Corp',
  },
  createdTimestamp: 1470989538,
};

export const mockInProgressConversion: Conversion = {
  id: 'con_01FCTS1XMKH9FF43CAFA4CXT3P',
  sell: {
    amount: 1000,
    currency: 'GBP',
  },
  buy: {
    currency: 'USD',
  },
  status: 'InProgress',
  createdTimestamp: 1470989538,
};
