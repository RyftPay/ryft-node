# Development

This document describes the process for setting up and developing the solution locally.

## Getting started

You will need a compatible npm and node installation. We recommend the latest versions but the solution supports node >= 18.

> [!IMPORTANT]
> Make sure that you run `npm ci` to install dependencies, before running any of the scripts provided in `package.json`

### Building the solution

You can use the script provided in `package.json`:

```bash
npm run build
```

### Testing the solution

The solution comes with unit tests. To run the tests, you can use the script provided in `package.json`

```bash
npm run test
```

### Maintaining Coding Guidelines

We follow the `prettier` TS guidelines for code formatting.

You can run the lint via the pre-prepared script:

```bash
npm run lint
```

Before raising a PR, please ensure you have formatted all code as follows:

```bash
npm run fmt
```
