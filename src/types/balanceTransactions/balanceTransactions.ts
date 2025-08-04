export interface BalanceTransactions {
  items: Array<{
    id: string
    type: string
    amount: number
    currency: string
    description?: string | null | undefined
    feeTotal?: number | null | undefined
    net?: number | null | undefined
    status: string
    origin: {
      id: string
      amount: number
      accountId?: string | null | undefined
    }
    availableAt: number
    createdTimestamp: number
    lastUpdatedTimestamp: number
  }>
  paginationToken?: string | null | undefined
}
