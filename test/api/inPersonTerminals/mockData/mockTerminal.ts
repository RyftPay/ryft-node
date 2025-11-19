import { Terminal } from '../../../../src/types/inPerson/terminals';

export const mockTerminal: Terminal = {
  id: 'tml_01J8HRF1FBEGYFFXNJMRZ704R6',
  name: 'Store Counter 1',
  location: {
    id: 'iploc_01J8HRF1FBEGYFFXNJMRZ704R6',
  },
  device: {
    type: 'Wise POS E',
    serialNumber: 'SN123456789',
  },
  action: {
    type: 'Transaction',
    status: 'InProgress',
    id: 'tmlact_01J8HRF1FBEGYFFXNJMRZ704R6',
    transaction: {
      type: 'Payment',
      paymentSessionId: 'ps_01J8HRF1FBEGYFFXNJMRZ704R6',
      amounts: {
        requested: 29900,
      },
      currency: 'GBP',
      receiptDetail: {
        customerCopy: {
          status: 'Required',
        },
        merchantCopy: {
          status: 'Succeeded',
        },
      },
      settings: {
        receiptPrintingSource: 'PointOfSale',
      },
    },
    error: null,
    createdTimestamp: 1672531200,
    completedTimestamp: null,
  },
  metadata: {
    storeId: 'STORE-123',
    counter: '1',
  },
  createdTimestamp: 1672531200,
  lastUpdatedTimestamp: 1672617600,
};
