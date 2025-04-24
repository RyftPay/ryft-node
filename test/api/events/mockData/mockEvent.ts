export const mockEvent = {
    id: 'evt_123',
    type: 'PaymentSession.captured',
    accountId: 'acc_123',
    createdTimestamp: 123456,
    data: {
        paymentSessionId: 'pay_123',
        amount: 123,
        currency: 'GBP',
        status: 'captured',
    }
};
