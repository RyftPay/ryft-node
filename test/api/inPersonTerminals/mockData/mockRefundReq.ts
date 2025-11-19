import { TerminalRefundRequest } from '../../../../src/types/inPerson/terminalsReq';

export const mockRefundReq: TerminalRefundRequest = {
  paymentSession: {
    id: 'ps_01J8HRF1FBEGYFFXNJMRZ704R6',
  },
  amount: 500,
  refundPlatformFee: false,
};