import { AccountLinksClient } from './api/accountLinks'
import { AccountsClient } from './api/accounts'
import { ApplePayClient } from './api/applePay'
import { BalancesClient } from './api/balances'
import { BalanceTransactionsClient } from './api/balanceTransactions'
import { CustomersClient } from './api/customers'
import { DisputesClient } from './api/disputes'
import { EventsClient } from './api/events'
import { FilesClient } from './api/files'
import { PaymentMethodsClient } from './api/paymentMethods'
import { PaymentSessionsClient } from './api/paymentSessions'
import { PayoutMethodsClient } from './api/payoutMethods'
import { PayoutsClient } from './api/payouts'
import { PersonsClient } from './api/persons'
import { FeesClient } from './api/platformFees'
import { SubscriptionsClient } from './api/subscriptions'
import { TransfersClient } from './api/transfers'
import { WebhooksClient } from './api/webhooks'
import { Config } from './types/config'
import { determineBaseUrl } from './utils/url'

export class Ryft {
  private readonly secretKey: string
  private readonly baseUrl: string

  public readonly accounts: AccountsClient
  public readonly accountLinks: AccountLinksClient
  public readonly applePay: ApplePayClient
  public readonly balances: BalancesClient
  public readonly balanceTransactions: BalanceTransactionsClient
  public readonly customers: CustomersClient
  public readonly disputes: DisputesClient
  public readonly events: EventsClient
  public readonly files: FilesClient
  public readonly paymentMethods: PaymentMethodsClient
  public readonly payouts: PayoutsClient
  public readonly paymentSessions: PaymentSessionsClient
  public readonly payoutMethods: PayoutMethodsClient
  public readonly persons: PersonsClient
  public readonly platformFees: FeesClient
  public readonly subscriptions: SubscriptionsClient
  public readonly transfers: TransfersClient
  public readonly webhooks: WebhooksClient

  constructor(config?: Config) {
    this.secretKey = config?.secretKey || process.env.RYFT_SECRET_KEY || ''
    if (!this.secretKey) {
      throw new Error('secret key is required')
    }

    const baseUrl = determineBaseUrl(this.secretKey)
    if (!baseUrl) {
      throw new Error('invalid secret key')
    }

    this.baseUrl = baseUrl

    this.accounts = new AccountsClient(this.secretKey, this.baseUrl)
    this.accountLinks = new AccountLinksClient(this.secretKey, this.baseUrl)
    this.applePay = new ApplePayClient(this.secretKey, this.baseUrl)
    this.balances = new BalancesClient(this.secretKey, this.baseUrl)
    this.balanceTransactions = new BalanceTransactionsClient(
      this.secretKey,
      this.baseUrl,
    )
    this.customers = new CustomersClient(this.secretKey, this.baseUrl)
    this.disputes = new DisputesClient(this.secretKey, this.baseUrl)
    this.events = new EventsClient(this.secretKey, this.baseUrl)
    this.files = new FilesClient(this.secretKey, this.baseUrl)
    this.paymentMethods = new PaymentMethodsClient(this.secretKey, this.baseUrl)
    this.paymentSessions = new PaymentSessionsClient(
      this.secretKey,
      this.baseUrl,
    )
    this.payouts = new PayoutsClient(this.secretKey, this.baseUrl)
    this.payoutMethods = new PayoutMethodsClient(this.secretKey, this.baseUrl)
    this.persons = new PersonsClient(this.secretKey, this.baseUrl)
    this.platformFees = new FeesClient(this.secretKey, this.baseUrl)
    this.subscriptions = new SubscriptionsClient(this.secretKey, this.baseUrl)
    this.transfers = new TransfersClient(this.secretKey, this.baseUrl)
    this.webhooks = new WebhooksClient(this.secretKey, this.baseUrl)
  }
}
