import { CreateTerminalRequest } from '../../../../src/types/inPerson/terminalsReq';

export const mockCreateTerminalReq: CreateTerminalRequest = {
  serialNumber: 'SN123456789',
  locationId: 'iploc_01J8HRF1FBEGYFFXNJMRZ704R6',
  name: 'Store Counter 1',
  metadata: {
    storeId: 'STORE-123',
    counter: '1',
  },
};