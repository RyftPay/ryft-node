# Ryft Node SDK

[![build](https://github.com/RyftPay/ryft-node/actions/workflows/ts.yml/badge.svg)](https://github.com/RyftPay/ryft-node/actions/workflows/ts.yml)
[![npm version](https://badge.fury.io/js/@ryftpay%2Fryft-sdk.svg)](https://badge.fury.io/js/@ryftpay%2Fryft-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Installation

```sh
# with npm
npm install @ryftpay/ryft-sdk

# with yarn
yarn add @ryftpay/ryft-sdk

# with bun
bun add @ryftpay/ryft-sdk
```

## Usage
    
The SDK must be configured with your account's secret key, available in the Ryft Dashboard. The SDK will automatically determine the environment based on the provided key. For example, `sk_sandbox...` will point to `sandbox`, while `sk_live` will point to `production`.

### Importing the SDK

You can access the SDK and all of the methods and types by importing it as follows:

```ts
import { Ryft } from '@ryftpay/ryft-sdk';
```

### Initialising with a secret key

You can pass your secret key via the `Config` in the SDK constructor. For example: 

```ts
const ryft = new Ryft({secretKey: 'sk_sandbox_1234567890'});
```

### Initialising with environment variables

You can set the following environment variable, and the SDK will automatically pick it up:

* `RYFT_SECRET_KEY`

> [!NOTE]
> If you use env variables you don't have to pass your secret key to the config. This is handled for you

### Using Promises and Handling Errors

Every method returns a chainable promise which can be used instead of a regular callback. This allows you to either `await` for the `Promise` to resolve or use the `then` and `catch` keywords to handle the return.

**Example with `await` and catching the `RyftError`**

```ts
try {
    const resp = await ryft.accounts.get('acc_123456789');
} catch (e RyftError) {
    console.log(e)
}
```

**Example with `then` and `catch`**

```ts
ryft.accounts.get('acc_123456789')
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
```

## Basic Example

```ts
import { Ryft } from '@ryftpay/ryft-sdk';

const ryft = new Ryft({secretKey: 'sk_sandbox_1234567890'});

ryft.accounts.get('acc_123456789')
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
```
