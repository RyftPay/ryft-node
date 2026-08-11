# Changelog

## 1.7.2

This release includes the following:
 - `Conversion.sell.amount` is now typed as required — the API always returns it (type-level fix only, no runtime change)
 - Removes the `fixedSide` field from `CreateConversionRequest` — the API only supports (and defaults to) fixing the sell side, so the field is redundant

## 1.7.1

This release includes the following:
 - Repository housekeeping only — no changes to the published package

## 1.7.0

This release includes the following:
 - Adds support for the new `/conversions` API resource via `ryft.conversions` (create, get, list and rate quotes)
 - Exports the conversion request/response types from the package entry point
 - Exports `RyftError`, `WebhookSignatureVerifier`, `BalancesClient` and `BalanceTransactionsClient` from the package entry point
 - The `User-Agent` header is now a valid RFC 9110 product token (`ryftpay-ryft-sdk/<version>`)

## 1.6.0

This release includes the following:
 - Adds support for payment session 3DS configuration via `paymentSettings.threeDs`
 - Adds missing phone number field to ShippingDetails

## 1.5.0

This release includes the following:
 - Fixes the logic to derive the prod base url from the secret key

## 1.4.0

This release includes the following:
 - The PaymentSession response now includes Card BIN data where applicable

## 1.3.0

This release includes the following:
 - the SDK now supports the new /in-person API resources

## 1.2.0

This release includes the following:
 - `cvc` can now be optional for MOTO payments

## 1.1.0

This release includes the following:
 - adds support for the new `/v1/balances` API
 - adds support for the new `/v1/balance-transactions` API
 - fixes an incorrect field in the payment-sessions API (`platformFeee` should be `platformFee`)

## 1.0.1

This release includes the following:
 - Fixes an incorrect field in the payout methods API (`country` should be `countryCode`)

## 1.0.0

Initial Release!
