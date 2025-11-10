import { Terminal } from '../../../../src/types/inPerson/terminals';

export const mockTerminal: Terminal = {
  id: 'tml_01J8HRF1FBEGYFFXNJMRZ704R6',
  name: 'Store Counter 1',
  location: {
    id: 'iploc_01J8HRF1FBEGYFFXNJMRZ704R6',
  },
  device: {
    serialNumber: 'SN123456789',
    model: 'Wise POS E',
    status: 'Online',
  },
  action: {
    type: 'Payment',
    status: 'InProgress',
    createdTimestamp: 1672531200,
  },
  metadata: {
    storeId: 'STORE-123',
    counter: '1',
  },
  createdTimestamp: 1672531200,
  lastUpdatedTimestamp: 1672617600,
};
