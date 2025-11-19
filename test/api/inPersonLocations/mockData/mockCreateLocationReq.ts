import { CreateInPersonLocationRequest } from '../../../../src/types/inPerson/locationsReq';

export const mockCreateLocationReq: CreateInPersonLocationRequest = {
  name: 'London Store',
  address: {
    lineOne: '123 High Street',
    city: 'London',
    country: 'GB',
    postalCode: 'SW1A 1AA',
  },
  geoCoordinates: {
    latitude: 51.5074,
    longitude: -0.1278,
  },
  metadata: {
    storeId: 'STORE-123',
  },
};
