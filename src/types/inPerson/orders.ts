export interface InPersonOrderItem {
  id: string;
  name: string;
  totalAmountPerUnit: number;
  taxAmountPerUnit: number;
  quantity: number;
}

export interface InPersonOrderShippingAddress {
  businessName?: string | null | undefined;
  firstName: string;
  lastName: string;
  lineOne: string;
  lineTwo?: string | null | undefined;
  city: string;
  country: string;
  postalCode: string;
  region?: string | null | undefined;
  deliveryInstructions?: string | null | undefined;
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
  address?: InPersonOrderShippingAddress | null | undefined;
  contact?: InPersonOrderShippingContact | null | undefined;
  method?: InPersonOrderShippingMethod | null | undefined;
}

export interface InPersonOrderCustomer {
  email: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
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
  customer: InPersonOrderCustomer;
  shipping?: InPersonOrderShipping | null | undefined;
  tracking?: InPersonOrderTracking | null | undefined;
  metadata?: Record<string, string> | null | undefined;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonOrders {
  items: InPersonOrder[];
  paginationToken?: string | null | undefined;
}
