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
  },
};