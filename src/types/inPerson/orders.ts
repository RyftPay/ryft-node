export interface InPersonOrderItem {
  id: string;
  name: string;
  totalAmountPerUnit: number;
  taxAmountPerUnit: number;
  quantity: number;
}

export interface InPersonOrderShippingAddress {
  businessName?: string;
  firstName: string;
  lastName: string;
  lineOne: string;
  lineTwo?: string;
  city: string;
  country: string;
  postalCode: string;
  region?: string;
  deliveryInstructions?: string;
}

export interface InPersonOrderShippingContact {
  email: string;
  mobilePhoneNumber: string;
}

export interface InPersonOrderShippingMethod {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  taxAmount: number;
}

export interface InPersonOrderShipping {
  address: InPersonOrderShippingAddress | null;
  contact: InPersonOrderShippingContact | null;
  method: InPersonOrderShippingMethod | null;
}

export interface InPersonOrderTrackingItem {
  carrier: string;
  reference: string;
  shippedTimestamp: number;
}

export interface InPersonOrderTracking {
  items: InPersonOrderTrackingItem[];
}

export interface InPersonOrder {
  id: string;
  status: 'AwaitingPayment' | 'ReadyToShip' | 'Shipped' | 'Cancelled';
  totalAmount: number;
  taxAmount: number;
  currency: string;
  items: InPersonOrderItem[];
  shipping: InPersonOrderShipping | null;
  tracking?: InPersonOrderTracking;
  metadata?: Record<string, string>;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonOrders {
  items: InPersonOrder[];
  paginationToken?: string;
}