import { InPersonOrder } from '../../../../src/types/inPerson/orders';

export const mockOrder: InPersonOrder = {
  id: 'ipord_01J8HRF1FBEGYFFXNJMRZ704R6',
  status: 'ReadyToShip',
  totalAmount: 29900,
  taxAmount: 4983,
  currency: 'GBP',
  items: [
    {
      skuId: 'ipsku_01J8HRF1FBEGYFFXNJMRZ704R6',
      quantity: 1,
    },
  ],
  shipping: {
    address: {
      lineOne: '123 High Street',
      city: 'London',
      country: 'GB',
      postalCode: 'SW1A 1AA',
    },
    name: 'John Doe',
  },
  tracking: {
    carrier: 'Royal Mail',
    trackingNumber: 'RM123456789GB',
    status: 'In Transit',
  },
  metadata: {
    orderId: 'ORDER-123',
  },
  createdTimestamp: 1672531200,
  lastUpdatedTimestamp: 1672617600,
};