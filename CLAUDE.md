# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Official Ryft Node.js SDK (`@ryftpay/ryft-sdk` on npm) — a typed client for the Ryft payments REST API. Public open-source repo (MIT). Zero runtime dependencies: HTTP uses native `fetch`, which is why Node >= 18 is required.

## Commands

```bash
npm ci               # install deps (required before any script)
npm run build        # tsc typecheck — emits declarations only (emitDeclarationOnly)
npm test             # all jest tests
npm run lint         # eslint
npm run bundle       # tsup → dist/ (CJS + ESM + d.ts); this is what gets published
```

Single test file / filter by test name:

```bash
npx jest test/api/payouts/payouts.test.ts
npm test -- -t 'getRate'
```

### Generated files gotcha

`src/version.ts` and `src/name.ts` are gitignored and generated from package.json by `npm run setup`. Every npm script runs setup first (via `&&` or `prebuild`), but on a fresh clone bare `npx jest` / `npx eslint` / `npx tsc` will fail until setup has run once.

### Formatting caveat

`.prettierrc.json` mandates no semicolons / single quotes, but much of the codebase predates it and doesn't comply, and CI has no format check (eslint carries no style rules). `npm run fmt` therefore rewrites files across the entire repo. Prefer formatting only the files you touched (`npx prettier --write <file>`) and matching the surrounding style.

## Architecture

Facade + one client class per REST resource:

- `src/client.ts` — the `Ryft` facade. Takes `{ secretKey }` (falls back to the `RYFT_SECRET_KEY` env var) and derives the base URL from the key prefix (`sk_sandbox...` → `https://sandbox-api.ryftpay.com/v1`, any other `sk_...` → `https://api.ryftpay.com/v1`; see `src/utils/url.ts`). Exposes each resource client as a public readonly property (`ryft.paymentSessions`, `ryft.accounts`, …).
- `src/api/<resource>.ts` — one `<Resource>Client` class per resource, constructed with `(secretKey, baseUrl)`, holding a `private readonly path`. Methods delegate to `makeRequest<T>` and return the response type directly.
- `src/utils/http.ts` — `makeRequest<T>` wraps `fetch`: builds the query string (dropping `undefined` params), sets auth + SDK headers, and throws `RyftError` (`src/types/errors.ts`) on any non-OK response. `uploadFile` handles the multipart file-upload endpoint.
- `src/types/<resource>/` — response models plus request models in `req.ts` (older resources use `<resource>Req.ts`). Cross-resource types (`address.ts`, `gender.ts`, `recurringPrice.ts`, …) sit at the top of `src/types/`. Optional API fields are typed `field?: T | null | undefined`.
- `src/utils/webhookSignatureVerifier.ts` — HMAC-SHA256 webhook signature check.

Cross-cutting API conventions:

- **Sub-account scoping**: methods take an optional trailing `account?: string` that becomes an `Account` header, spread in as `...(account && { extraHeaders: { Account: account } })`.
- **List endpoints** take positional optional params `(startTimestamp, endTimestamp, ascending, limit, startsAfter, account?)` and return `{ items, paginationToken? }`.

### Adding a new API resource

Touch all five places (`conversions` is the newest resource and the template to copy):

1. `src/types/<resource>/<resource>.ts` + `req.ts` — response/request models
2. `src/api/<resource>.ts` — the client class
3. `src/client.ts` — public readonly property + constructor wiring
4. `src/index.ts` — export the client class and `export *` its types (all client classes are exported, but conversions is the only resource whose request/response types are — the rest are reachable only by deep-importing from `dist`; follow the conversions pattern, don't copy the gap)
5. `test/api/<resource>/<resource>.test.ts` + `mockData/` — see below

## Tests

Jest + ts-jest, no network: tests mock `global.fetch` and assert the **exact** URL, headers, and body of every call. Shared fixtures live in `test/api/mockData.ts` (`mockSecretKey` is `sk_sandbox_123`, so expected URLs are the sandbox host; also `defaultHeaders` and `mockErrorResponse`); per-resource fixtures live in `test/api/<resource>/mockData/`. Each method gets at least three cases: success, success for a sub-account (asserting the `Account` header), and failure (rejects with `RyftError`).

Test files must end in `.test.ts` or jest silently never runs them (the Apple Pay suite was lost to this for years).

## CI & Releasing

- `.github/workflows/ts.yml` (PRs and master): lint → build → test on Node 18 and 20.
- Version bumps: update `version` in package.json and add a `CHANGELOG.md` entry in the same PR. Publishing to npm happens via `publish.yml` when a GitHub release is published (build → test → bundle → `npm publish`).
