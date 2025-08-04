export interface Balances {
  items: Array<{
    currency: string
    pending: {
      amount: number
    }
    cleared: {
      amount: number
    }
    available: {
      amount: number
    }
    lastUpdatedTimestamp: number
  }>
}
