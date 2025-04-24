export interface CreateTransferRequest {
    /**
     * The amount (in minor units) to transfer
     */
    amount: number;

    /**
     * The three-letter ISO currency code
     */
    currency: string;

    /**
     * Where the `amount` should be taken from.
     * Note that you cannot specify both source & destination.
     * A request in which source is specified will initiate a transfer from the supplied sub account to your own platform account.
     *  * the sub account's balance will be decremented
     *  * your platform account balance will be incremented
     */
    source?: TransferDestination | null | undefined;

    /**
     * Where the `amount` should be credited to.
     * Note that you cannot specify both source & destination.
     * A request in which destination is specified will initiate a transfer to the supplied sub account from your own platform account.
     *  * the sub account's balance will be incremented
     *  * your platform account balance will be decremented
     */
    destination?: TransferDestination | null | undefined;

    /**
     * An optional reason describing why the transfer was initiated. Not required but recommended.
     */
    reason?: string | null | undefined;

    /**
     * Used to attach any custom key-value data to the transfer. You can have a maximum of 5 pieces of metadata.
    */
    metadata?: Record<string, string> | null | undefined;
}

export interface TransferDestination {
    /**
     * ID of the Ryft account to send the funds to
     */
    accountId: string;
}
