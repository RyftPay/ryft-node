export interface InPersonLocationAddress {
  lineOne: string;
  lineTwo?: string | null | undefined;
  city: string;
  country: string;
  postalCode: string;
  region?: string | null | undefined;
}

export interface InPersonLocationGeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface InPersonLocation {
  id: string;
  name: string;
  address: InPersonLocationAddress;
  geoCoordinates?: InPersonLocationGeoCoordinates | null | undefined;
  metadata?: Record<string, string> | null | undefined;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonLocations {
  items: InPersonLocation[];
  paginationToken?: string | null | undefined;
}

export interface InPersonLocationDeleted {
  id: string;
}
