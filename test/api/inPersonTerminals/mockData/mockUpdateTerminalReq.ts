import { UpdateTerminalRequest } from '../../../../src/types/inPerson/terminalsReq';

export const mockUpdateTerminalReq: UpdateTerminalRequest = {
  name: 'Updated Counter Name',
  metadata: {
    storeId: 'STORE-123',
    counter: '2',
  },
};