import { RecurringInterval } from "./recurringInterval";

export interface RecurringPrice {
    /**
     * The amount (in minor units) that is charged on each recurring payment throughout the subscription
     */
    amount: number;

    /**
     * The ISO currency code
     */
    currency: string;

    /**
     * The interval to charge the customer
     */
    interval: RecurringInterval;
}
