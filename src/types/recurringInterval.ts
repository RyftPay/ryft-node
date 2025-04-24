export interface RecurringInterval {
    /**
     * The type of interval to wait for between charges
     */
    unit: string;

    /**
     * The number of intervals between charges. e.g. `type = Days` & `count = 60` would charge the customer every 60 days.
     */
    count: number;

    /**
     * (optional) The total number of charges throughout the lifecycle of the recurring series. Leave null for products that continue indefinitely.
     */
    times?: number | null | undefined;
}
