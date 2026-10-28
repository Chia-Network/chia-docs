---
title: App Integration (OAuth)
slug: /cloud-wallet/app-integration
---

This guide shows how to register an application with the Chia Cloud Wallet, how a user connects it to their account, and how the application signs in with OAuth 2.0. It also shows how users review and remove the applications they have connected.

OAuth is for third-party web, desktop and mobile applications that act on a user's behalf with the user's consent. If you are writing a script or service that uses your own account, use an API key instead (`Settings` > `API Keys`).

:::info

OAuth never gives an application more access than the user already has. The user chooses which permissions and which vaults to grant, and every request is still checked against the user's own permissions and plan.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account
- An organization administrator, who registers the application
- An HTTPS redirect URI that your application controls (HTTP is allowed for `localhost` while developing)

## Register an application

An organization administrator registers an application. The `OAuth Apps` tab only appears in `Settings` for accounts where app registration is available.

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open `Settings` and select the `OAuth Apps` tab.

3. Select `Create App`.

4. Fill in the form:
   - `Name`: up to 50 characters.
   - `Description`: optional, up to 1,000 characters.
   - `Redirect URIs`: up to 10, each at most 100 characters, unique, without a fragment. Use HTTPS, or HTTP for `localhost`. Select `Add Redirect URI` for more than one.
   - `Requested Scopes`: select at least one permission that the application may ask users for. See [Choose scopes](#choose-scopes).

5. Select `Create App`.

The `OAuth App Created` dialog shows the `Client ID`. Copy it, because your application needs it for every request. The dialog also shows a `Client Secret` once. Public applications sign in with PKCE and do not use the secret, so you do not need it yet.

### Approval

A new app has the status `Pending` and cannot be used to authorize users until Cloud Wallet approves it. The status on the app's card changes to `Approved`, `Rejected` or `Revoked`. If an app is rejected or revoked, the card shows the reason.

While an app is `Pending`, an administrator can select `Edit` to change its details or `Delete` to remove it. Once it has been reviewed, the registration can no longer be changed here. Register a new app instead.

## Choose scopes

A scope is a permission that your application asks the user to grant. Request only the scopes the application needs, separated by spaces when you [authorize the user](#authorize-the-user). The scopes you pick when registering are the ones the application may request later.

The scope catalog is public. Query it for the current list, descriptions and the type of resource each scope applies to:

```graphql
query AvailableOAuthScopes {
  oAuthScopes(first: 100) {
    edges {
      node {
        scope
        description
        resourceType
        resourceGrantNotRequired
      }
    }
  }
}
```

Common scopes:

| Operation                                                                         | Scope                     |
| --------------------------------------------------------------------------------- | ------------------------- |
| Read vaults, balances, transactions and signature requests                        | `wallet.read`             |
| Read a vault's NFTs                                                               | `nft.read`                |
| Read a vault's offers                                                             | `offer.read`              |
| `deriveVaultAddress`, `resendSignatureRequest`                                    | `wallet.write`            |
| `createTransaction`, `clawBackTransaction`, `finalizeTransaction`, `transferNfts` | `transfer.create`         |
| `deleteTransaction`                                                               | `transfer.delete`         |
| `signSignatureRequest`                                                            | `wallet.sign`             |
| `submitSignatureRequest`                                                          | `signatureRequest.submit` |
| `createOffer`                                                                     | `offer.create`            |
| `addOffer`, `takeOffer`                                                           | `offer.accept`            |
| `cancelOffer`                                                                     | `offer.cancel`            |
| `bulkMintNfts`                                                                    | `nft.create`              |

When a scope applies to vaults or another resource type, the consent screen asks the user which resources to grant it for. Include `offline_access` if your application needs a refresh token. The older `read_vault` and `write_vault` scopes are deprecated, so use the granular scopes in new integrations.

## Authorize the user

OAuth uses the authorization code flow with PKCE (`S256`). The endpoints are on the same host as the GraphQL API. The examples use testnet, so replace `api.vault.chiatest.net` with `api.vault.chia.net` for mainnet.

| Purpose                    | Method and path  |
| -------------------------- | ---------------- |
| Authorization              | `GET /authorize` |
| Token exchange and refresh | `POST /token`    |
| Token revocation           | `POST /revoke`   |
| GraphQL                    | `POST /graphql`  |

OAuth libraries that read server metadata can use `/api/auth/.well-known/oauth-authorization-server` on the same host. The issuer is `https://<host>/api/auth`, which is also the `iss` parameter on the callback.

### Redirect to the authorization endpoint

Generate a random `state` value and a PKCE code verifier, and keep both until the callback. The `S256` challenge is `base64url(sha256(code_verifier))` without padding. A verifier is 43 to 128 characters from the unreserved URI character set.

```js
import { createHash, randomBytes, randomUUID } from "node:crypto";

const clientId = process.env.CHIA_OAUTH_CLIENT_ID;
const redirectUri = process.env.CHIA_OAUTH_REDIRECT_URI;
const state = randomUUID();
const codeVerifier = randomBytes(48).toString("base64url");
const codeChallenge = createHash("sha256")
  .update(codeVerifier)
  .digest("base64url");

const authorizeUrl = new URL("https://api.vault.chiatest.net/authorize");
authorizeUrl.searchParams.set("client_id", clientId);
authorizeUrl.searchParams.set("redirect_uri", redirectUri);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("scope", "wallet.read offline_access");
authorizeUrl.searchParams.set("state", state);
authorizeUrl.searchParams.set("code_challenge", codeChallenge);
authorizeUrl.searchParams.set("code_challenge_method", "S256");

// Store state and codeVerifier in the user's server-side session before redirecting.
console.log(authorizeUrl.toString());
```

Send the user's browser to that URL. The `redirect_uri` must exactly match one of the redirect URIs you registered. The user logs in to Cloud Wallet if needed, reviews the permissions on the consent screen, and chooses which vaults to grant them for.

### Handle the callback

When Cloud Wallet redirects back to your application:

1. Reject the response if `state` does not exactly match the stored value.

2. If the response has an `error` parameter, handle it instead of looking for a code.

3. Exchange the authorization `code` immediately. A code can be used only once.

```sh
curl https://api.vault.chiatest.net/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'client_id=<client_id>' \
  --data-urlencode 'code=<authorization_code>' \
  --data-urlencode 'redirect_uri=<registered_redirect_uri>' \
  --data-urlencode 'code_verifier=<pkce_verifier>'
```

The JSON response contains `access_token` and `token_type`. When present, `expires_in` tells you when to renew. A grant that includes `offline_access` also returns a `refresh_token`. The `scope` value, when present, lists the scopes granted to the token.

### Call the API

Send the access token as a bearer token:

```sh
curl https://api.vault.chiatest.net/graphql \
  -H 'Authorization: Bearer <access_token>' \
  -H 'Content-Type: application/json' \
  --data '{"query":"query CurrentUser { viewer { id } }"}'
```

Send only one authentication method per request. A request that combines a bearer token with a session cookie or an API-key signature is rejected.

## Refresh and revoke tokens

If the user granted `offline_access`, exchange the refresh token for a new access token:

```sh
curl https://api.vault.chiatest.net/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=refresh_token' \
  --data-urlencode 'client_id=<client_id>' \
  --data-urlencode 'refresh_token=<refresh_token>'
```

A successful refresh rotates the refresh token. Store the new access token and refresh token together, and discard the old refresh token.

When the user disconnects your application, revoke the token:

```sh
curl https://api.vault.chiatest.net/revoke \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=<client_id>' \
  --data-urlencode 'token=<access_or_refresh_token>'
```

Revoking a refresh token also stops future refreshes. Treat a rejected refresh as a disconnected authorization and send the user through the authorization flow again.

## Handle errors

Authorization errors redirect to your registered callback with an `error` parameter and sometimes `error_description`. Token endpoint errors return a non-2xx JSON response with the same fields. Handle `invalid_request`, `invalid_client`, `invalid_grant`, `invalid_scope` and `invalid_target`, and do not show the descriptions to untrusted users. An `invalid_grant` on a code exchange or refresh means you must start a new authorization.

## Restrictions

- Public clients use PKCE and do not send a client secret. Never put a confidential secret in browser, desktop or mobile code.
- OAuth access tokens work for GraphQL over HTTP. GraphQL subscriptions are not available to OAuth sessions, because the WebSocket handshake rejects them.
- A token can only call operations that support OAuth, and only for the scopes and vaults the user consented to.
- Account security and connected-application management operations can require a direct user session and reject delegated OAuth access.

## Manage connected applications

Users stay in control of what they have connected.

1. Open `Settings` and select the `Applications` tab. It lists every application the user has connected, with a summary of what each can do and when it was connected. If nothing is connected, the tab says so.

2. Select an application to open its details. `Access by Resource` lists the permissions it holds, grouped by resource type.

3. To change which vaults a permission applies to, adjust the selection and select `Save`. To remove a permission, revoke it. A revoke takes effect immediately, including for any session the application has open.

4. To remove the application entirely, select `Disconnect` and confirm. The application loses every permission and can be connected again from the application itself.

Permissions the application can ask for but does not currently hold are listed under `Not Granted`. To grant one, including one that was revoked, connect the application again and it will ask.

An application connected before per-resource permissions were available shows a `Legacy` badge and can only be managed as a whole.
