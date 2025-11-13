import { InPersonOrder } from '../../../../src/types/inPerson/orders';

export const mockOrder: InPersonOrder = {
  id: 'ipord_01J8HRF1FBEGYFFXNJMRZ704R6',
  status: 'ReadyToShip',
  totalAmount: 29900,
  taxAmount: 4983,
  currency: 'GBP',
  items: [
    {
      id: 'ipsku_01J8HRF1FBEGYFFXNJMRZ704R6',
      name: 'Pax A920 Pro',
      totalAmountPerUnit: 29900,
      taxAmountPerUnit: 4983,
      quantity: 1,
    },
  ],
  shipping: {
    address: {
      businessName: 'Acme Corp',
      firstName: 'John',
      lastName: 'Doe',
      lineOne: '123 High Street',
      lineTwo: 'Floor 2',
      city: 'London',
      country: 'GB',
      postalCode: 'SW1A 1AA',
      region: 'Greater London',
      deliveryInstructions: 'Please ring the bell twice',
    },
    contact: {
      email: 'john.doe@example.com',
      mobilePhoneNumber: '+447900000000',
    },
    method: {
      id: 'ipsm_01J8HRF1FBEGYFFXNJMRZ704R6',
      name: 'Standard Delivery',
      description: 'Delivery within 3-5 business days',
      totalAmount: 500,
      taxAmount: 83,
    },
  },
  tracking: {
    items: [
      {
        carrier: 'Royal Mail',
        reference: 'RM123456789GB',
        shippedTimestamp: 1672617600,
      },
    ],
  },
  metadata: {
    orderId: 'ORDER-123',
  },
  createdTimestamp: 1672531200,
  lastUpdatedTimestamp: 1672617600,
};