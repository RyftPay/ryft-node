import {
  InPersonLocationAddress,
  InPersonLocationGeoCoordinates,
} from './locations';

export interface CreateInPersonLocationRequest {
  name: string;
  address: InPersonLocationAddress;
  geoCoordinates?: InPersonLocationGeoCoordinates | null | undefined;
  metadata?: Record<string, string> | null | undefined;
}

export interface UpdateInPersonLocationRequest {
  name?: string | null | undefined;
  metadata?: Record<string, string> | null | undefined;
}
