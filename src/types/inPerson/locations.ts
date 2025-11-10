export interface InPersonLocationAddress {
  lineOne: string;
  lineTwo?: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface InPersonLocationGeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface InPersonLocation {
  id: string;
  name: string;
  address: InPersonLocationAddress;
  geoCoordinates: InPersonLocationGeoCoordinates | null;
  metadata?: Record<string, string>;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonLocations {
  items: InPersonLocation[];
  paginationToken?: string;
}

export interface InPersonLocationDeleted {
  id: string;
}