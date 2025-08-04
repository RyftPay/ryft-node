export interface Events {
  items: Event[]
}

export interface Event {
  id: string
  eventType: string
  data: any
  endpoints: Endpoint[]
  accountId?: string | null | undefined
  createdTimestamp: number
}

export interface PaymentMethodTokenizedDetails {
  id: string
  stored: boolean
}

export interface PausePaymentDetail {
  reason?: string | null | undefined
  resumeAtTimestamp?: number | null | undefined
  pausedAtTimestamp: number
}

export interface Endpoint {
  webhookId: string
  acknowledged: boolean
  attempts: number
}
