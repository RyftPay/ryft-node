import { TemporaryAccountLink } from "../types/accountLinks/accountLinks";
import { makeRequest } from "../utils/http";

/**
  * Generate temporary account link URLs to our portal for your sub accounts to register and configure their payout details.
  * This API can only be accessed for `Hosted` sub accounts.
  * Docs: https://api-reference.ryftpay.com/#tag/Account-Links
  */
export class AccountLinksClient {
    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async generateTemporaryAccountLink(accountId: string, redirectUrl: string): Promise<TemporaryAccountLink> {
        return makeRequest({
            path: '/account-links',
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                accountId,
                redirectUrl
            }
        })
    }
}
