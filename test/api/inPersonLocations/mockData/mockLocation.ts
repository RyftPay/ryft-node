import { InPersonLocation } from '../../../../src/types/inPerson/locations';

export const mockLocation: InPersonLocation = {
  id: 'iploc_01J8HRF1FBEGYFFXNJMRZ704R6',
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
  createdTimestamp: 1672531200,
  lastUpdatedTimestamp: 1672617600,
};