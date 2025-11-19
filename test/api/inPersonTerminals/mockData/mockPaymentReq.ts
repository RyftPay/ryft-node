import { TerminalPaymentRequest } from '../../../../src/types/inPerson/terminalsReq';

export const mockPaymentReq: TerminalPaymentRequest = {
  amounts: {
    requested: 1000,
  },
  currency: 'GBP',
  paymentSession: {
    platformFee: 10,
    metadata: {
      orderId: 'ORDER-123',
    },
    paymentSettings: {
      paymentMethodOptions: {
        disabled: ['Amex'],
      },
      platform: {
        paymentFees: {
          processor: {
            bookTo: 'ac_3fe8398f-8cdb-43a3-9be2-806c4f84c327',
          },
        },
      },
    },
  },
};
