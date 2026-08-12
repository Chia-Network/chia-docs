---
title: Address Book
slug: /cloud-wallet/address-book
---

This guide shows how to save contacts in the Chia Cloud Wallet Address Book and use them when sending assets.

:::info

You need a Cloud Wallet account. If you have not signed up yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account
- At least one contact email to store (required for every contact)
- Optional Chia addresses (`xch` or `txch`) to save for sending

## Open Address Book

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open Address Book from the left-hand menu (tooltip: `Address book`):

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-01_navigation_light.png" alt="Navigate to Address Book from the left-hand menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-01_navigation_dark.png" alt="Navigate to Address Book from the left-hand menu" width="100%" className="theme-image-dark"/>
</div>

3. From the list you can search contacts, change sort order (`Oldest to Newest`, `Newest to Oldest`, `A to Z`, `Z to A`), and click `Add Contact` (or `Add Your First Contact` when the list is empty).

## Add a contact

1. Click `Add Contact` to open the create form.

2. Under `Name`, enter the contact name (2 to 100 characters).

3. Under `Emails`, enter at least one email address. Use `Add Another` for more emails. Contacts must have at least one email.

4. Under `Addresses`, optionally add Chia addresses. Each row has a `Label` and an `Address` (`xch` or `txch`). Use `Add Another` for more addresses. Labels help you recognize addresses later when sending.

5. Avatar image upload is temporarily disabled in the app. Leave the avatar section unchanged for now.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-02_create_light.png" alt="Create Contact form with name, emails, and addresses" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-02_create_dark.png" alt="Create Contact form with name, emails, and addresses" width="100%" className="theme-image-dark"/>
</div>

6. Click `Create Contact`. Click `Cancel` to return to the list without saving.

Duplicate emails, addresses, or labels are blocked. If the app reports a duplicate, change the conflicting value and try again.

## View and edit a contact

1. From the Address Book list, click a contact card to open it.

2. Edit the name, emails, or addresses on the detail page. Changes save when you leave a field (there is no separate Save button).

3. Click `Back` to return to the list.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-03_detail_light.png" alt="Contact detail page for viewing and editing" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-03_detail_dark.png" alt="Contact detail page for viewing and editing" width="100%" className="theme-image-dark"/>
</div>

## Delete a contact

1. On the Address Book list, open the delete control on the contact card.

2. Confirm in the `Delete contact` dialog. The warning states that the action is not reversible.

3. Click `Delete` to remove the contact, or `Cancel` to keep it.

## Use a contact when sending

When you send XCH, a token, or an NFT from a vault, the `Send To` field accepts a typed address or a contact suggestion.

1. Open Send for the asset you want to transfer.

2. In `Send To`, start typing a contact name, email, address, or label.

3. Choose a suggestion to fill the destination address. Suggestions may show as `label - address`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-04_send_to_light.png" alt="Send To field with Address Book contact suggestions" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-04_send_to_dark.png" alt="Send To field with Address Book contact suggestions" width="100%" className="theme-image-dark"/>
</div>

You can still paste any valid address directly without using a saved contact.

## Troubleshooting

- Ensure every contact has a name and at least one valid email
- Use only `xch` or `txch` bech32m addresses in the Addresses section
- If send suggestions do not appear, confirm the contact has at least one saved address
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
