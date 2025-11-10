import {
  InPersonLocationAddress,
  InPersonLocationGeoCoordinates,
} from './locations';

export interface CreateInPersonLocationRequest {
  name: string;
  address: InPersonLocationAddress;
  geoCoordinates?: InPersonLocationGeoCoordinates;
  metadata?: Record<string, string>;
}

export interface UpdateInPersonLocationRequest {
  name?: string;
  metadata?: Record<string, string>;
}