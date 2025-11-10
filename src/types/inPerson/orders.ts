export interface InPersonOrderItem {
  skuId: string;
  quantity: number;
}

export interface InPersonOrderShipping {
  address: {
    lineOne: string;
    lineTwo?: string;
    city: string;
    country: string;
    postalCode: string;
  };
  name: string;
}

export interface InPersonOrderTracking {
  carrier?: string;
  trackingNumber?: string;
  status?: string;
}

export interface InPersonOrder {
  id: string;
  status: 'AwaitingPayment' | 'ReadyToShip' | 'Shipped' | 'Cancelled';
  totalAmount: number;
  taxAmount: number;
  currency: string;
  items: InPersonOrderItem[];
  shipping: InPersonOrderShipping | null;
  tracking: InPersonOrderTracking;
  metadata?: Record<string, string>;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonOrders {
  items: InPersonOrder[];
  paginationToken?: string;
}