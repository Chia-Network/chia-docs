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

2. Open Address Book from the left-hand menu (tooltip: `Address book`). If you have no contacts yet, the empty state invites you to `Add Your First Contact`:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-01_navigation_light.png" alt="Empty Address Book with Address book selected in the left-hand menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-01_navigation_dark.png" alt="Empty Address Book with Address book selected in the left-hand menu" width="100%" className="theme-image-dark"/>
</div>

3. Click `Add a Contact` (empty state) or `Add Contact` (when you already have contacts).

## Add a contact

1. Under `Name`, enter the contact name as you want it to appear.

2. Under `Emails`, enter at least one email address. Use `+ Add Another` for more emails. Contacts must have at least one email.

3. Under `Addresses`, optionally add Chia addresses. Each row has a short name (label) and an `Address` (`xch` or `txch`). Use `+ Add Another` for more addresses.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-02_create_light.png" alt="Create Contact form with name, emails, and addresses" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-02_create_dark.png" alt="Create Contact form with name, emails, and addresses" width="100%" className="theme-image-dark"/>
</div>

4. Click `Create Contact` to return to the list. Duplicate emails, addresses, or labels are blocked. If the app reports a duplicate, change the conflicting value and try again.

## Contacts list

After you add contacts, the Address Book list shows search, `Sort`, and `Add Contact`. Each card shows the contact name, email, and address label when one is saved. Use the trash icon on a card to delete that contact.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/address-book-03_list_light.png" alt="Address Book contacts list with search, sort, and Add Contact" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/address-book-03_list_dark.png" alt="Address Book contacts list with search, sort, and Add Contact" width="100%" className="theme-image-dark"/>
</div>

Sort options include `Oldest to Newest`, `Newest to Oldest`, `A to Z`, and `Z to A`.

## View and edit a contact

1. From the Address Book list, click a contact card to open it.

2. Edit the name, emails, or addresses on the contact page. The layout matches Create Contact. Changes save when you leave a field (there is no separate Save button).

3. Return to the list when you are done.

## Delete a contact

1. On the Address Book list, click the trash icon on the contact card.

2. Confirm in the `Delete contact` dialog. The warning states that the action is not reversible.

3. Click `Delete` to remove the contact, or `Cancel` to keep it.

## Use a contact when sending

When you send XCH, a token, or an NFT from a vault, the `Send To` field accepts a typed address or a contact suggestion.

1. Open Send for the asset you want to transfer.

2. In `Send To`, start typing a contact name, email, address, or label. You can also use the address book control on the address field.

3. Choose a suggestion to fill the destination address. Suggestions show the contact name, email, and labeled address when available.

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
