---
title: In App Support
slug: /cloud-wallet/in-app-support
---

This guide shows how to contact Cloud Wallet support from inside the app, track your tickets, and reply until the issue is resolved.

## Opening Support

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open your account menu from the profile control, then click `Support`:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/in-app-support-01_open_menu_light.png" alt="Open Support from the account menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/in-app-support-01_open_menu_dark.png" alt="Open Support from the account menu" width="100%" className="theme-image-dark"/>
</div>

3. The Support screen lists your tickets under `Your Tickets`. Use `Create Ticket` to start a new request. Toggle `Show Completed` when you want to include solved and closed tickets in the list:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/in-app-support-02_tickets_list_light.png" alt="Your Tickets list on the Support screen" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/in-app-support-02_tickets_list_dark.png" alt="Your Tickets list on the Support screen" width="100%" className="theme-image-dark"/>
</div>

If you have not created any tickets yet, the empty state invites you to create your first ticket.

## Creating a ticket

1. From the Support screen, click `Create Ticket`.

2. Fill in the form:

   - `Subject` (required): a short summary of the issue (up to 150 characters)
   - `Ticket Type` (required): choose the category that best matches your request (see [Ticket types](#ticket-types))
   - `Details` (required): a full description of what happened and what you expected
   - `Attachments` (optional): PNG or JPEG screenshots. Total attachment size must stay under 2 MB
   - `Vault` (optional): select the vault related to the issue when you have one or more vaults

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/in-app-support-03_create_ticket_light.png" alt="Create Ticket form" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/in-app-support-03_create_ticket_dark.png" alt="Create Ticket form" width="100%" className="theme-image-dark"/>
</div>

3. Click `Submit Ticket`. After a successful submit, the app returns you to the Support list and shows a confirmation that includes the new ticket number when available.

Click `Cancel` at any time to return to the Support list without submitting.

### Ticket types

| Ticket type   | Use when                                                   |
| ------------- | ---------------------------------------------------------- |
| `Support`     | General help with your account, vaults, or wallet features |
| `Bug Report`  | Something in the product is not working as expected        |
| `Enhancement` | You want to request a product improvement                  |
| `Buy XCH`     | Help with purchasing XCH in the Cloud Wallet               |

## Viewing a ticket and replying

1. On the Support screen, click a ticket card to open it.

2. The ticket detail view shows the subject, ticket number, status, created and last updated times, ticket type when available, the message thread, and a `Reply` section at the bottom:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/in-app-support-04_ticket_detail_light.png" alt="Support ticket detail with messages and reply" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/in-app-support-04_ticket_detail_dark.png" alt="Support ticket detail with messages and reply" width="100%" className="theme-image-dark"/>
</div>

3. To reply, enter a message in the `Reply` section. You can attach optional PNG or JPEG files (same 2 MB total limit as when creating a ticket), then click `Send`.

### Closing or reopening a ticket

While a ticket is still open (not solved or closed):

- Click `Close without Reply` to mark it solved without adding a message
- Enter a reply and click `Close with Reply` to close it with a final note

If a ticket is `Solved`, enter a reply and click `Reopen with Reply` to open it again.

Permanently `Closed` tickets show an alert that new replies are not accepted. Create a new ticket if you still need help.

## Troubleshooting

If you cannot use In App Support, visit the #support channel in [our Discord](https://discord.gg/chia).
