---
title: Developer API
slug: /cloud-wallet/developer-api
---

The Chia Cloud Wallet has a GraphQL API for building on top of your vaults. You can use it to read vaults and balances, send XCH and CATs, sign and submit signature requests, create and take offers, and mint and transfer NFTs.

The full guide and reference are in the [Cloud Wallet API documentation](https://vault.chia.net/docs). This page is a short overview. Use the API documentation for operations, types, request examples, error codes and rate limits.

## Endpoints

Each network has one GraphQL endpoint. Build and test on testnet, then switch the host to mainnet. Accounts, vaults and API keys do not carry over between the two networks.

| Network   | GraphQL over HTTP                        | Subscriptions (WebSocket)              |
| --------- | ---------------------------------------- | -------------------------------------- |
| Testnet11 | `https://api.vault.chiatest.net/graphql` | `wss://api.vault.chiatest.net/graphql` |
| Mainnet   | `https://api.vault.chia.net/graphql`     | `wss://api.vault.chia.net/graphql`     |

To get a testnet account and TXCH, see `Using testnet` in [Getting Started](/cloud-wallet/getting-started).

## Authentication

Most operations need credentials. There are two ways to authenticate:

- **API key:** for your own scripts and services. Create one in the Cloud Wallet under **Settings** > **API Keys**. The private key is shown only once, so store it securely. Each request is signed with the key, and API keys also work for subscriptions. The number of keys you can create depends on your plan.
- **OAuth 2.0:** for third-party web, desktop and mobile applications that act on a user's behalf. The user chooses which permissions and vaults to grant. OAuth tokens work over HTTP but not for subscriptions.

Neither method gives more access than the account already has. See the authentication section of the [API documentation](https://vault.chia.net/docs) for request signing and the OAuth flow.

## Resources

- [API documentation](https://vault.chia.net/docs): the guide and the full reference. The testnet copy is at [vault.chiatest.net/docs](https://vault.chiatest.net/docs).
- [Public schema](https://vault.chia.net/docs/schema.graphql): the schema in SDL, for code generation and editor tooling. Introspection is disabled in production, so use this file instead.
- [llms.txt](https://vault.chia.net/docs/llms.txt): links to a single Markdown copy of the guide, for AI agents and other tools.
