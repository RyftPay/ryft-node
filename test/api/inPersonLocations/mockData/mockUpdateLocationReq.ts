import { UpdateInPersonLocationRequest } from '../../../../src/types/inPerson/locationsReq';

export const mockUpdateLocationReq: UpdateInPersonLocationRequest = {
  name: 'Updated London Store',
  metadata: {
    storeId: 'STORE-123',
    region: 'Central London',
  },
};