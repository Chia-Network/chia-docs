---
sidebar_label: Offers
title: Offer RPC
slug: /offer-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

- "wallet_type" becomes \"wallet_type\"
- "nft_wallet" becomes \"nft_wallet\"
- etc

</details>

## Reference

### `create_offer_for_ids`

Creates a new offer.

- **offer_dict**: A dictionary of the offer to create.
- **fee:** An optional fee (in mojos) to include with the offer. Defaults to 0.
- **validate_only:** Defaults to False. Set to True to verify the validity of a potential offer, rather than actually creating an offer.

```python
async def create_offer_for_ids(
  self, offer_dict: Dict[uint32, int], fee=uint64(0), validate_only: bool = False
) -> Tuple[Optional[Offer], TradeRecord]:
  send_dict: Dict[str, int] = {}
  for key in offer_dict:
    send_dict[str(key)] = offer_dict[key]

  res = await self.fetch("create_offer_for_ids", {"offer": send_dict, "validate_only": validate_only, "fee": fee})
  offer: Optional[Offer] = None if validate_only else Offer.from_bytes(hexstr_to_bytes(res["offer"]))
  return offer, TradeRecord.from_json_dict_convenience(res["trade_record"], res["offer"])
```

sample:
```json
{
  "offer": {
    "123456789": 100,
    "987654321": 200,
    "555555555": 300
  },
  "fee": 500,
  "validate_only": true
}
```

### `get_offer_summary`

Returns the summary of a specific offer. Works for offers in any state.

- **offer:** The offer to summarize.

```python
async def get_offer_summary(self, offer: Offer) -> Dict[str, Dict[str, int]]:
  res = await self.fetch("get_offer_summary", {"offer": bytes(offer).hex()})
  return res["summary"]
```

sample:
```json
{
  "offer": "c69a7e9eb1e1fc7a85df169bccb76c1e135620d0f6dd414b476c73798625f8b6"
}
```

### `check_offer_validity`

Checks whether a specific offer is valid.

- **offer:** The offer to check. The offer is considered valid if it is in any of the following states:

  - PENDING_ACCEPT
  - PENDING_CONFIRM
  - PENDING_CANCEL

  The offer is no longer valid if it is in any of the following states:

  - CANCELLED
  - CONFIRMED
  - FAILED

```python
async def check_offer_validity(self, offer: Offer) -> bool:
  res = await self.fetch("check_offer_validity", {"offer": bytes(offer).hex()})
  return res["valid"]
```

sample:
```json
{
  "offer": "c69a7e9eb1e1fc7a85df169bccb76c1e135620d0f6dd414b476c73798625f8b6"
}
```

### `take_offer`

Takes (accepts) a specific offer, with a given fee.

- **offer:** The offer to accept. Must be in the PENDING_ACCEPT state.
- **fee:** An optional fee (in mojos) to include with the offer. Defaults to 0.

```python
async def take_offer(self, offer: Offer, fee=uint64(0)) -> TradeRecord:
  res = await self.fetch("take_offer", {"offer": bytes(offer).hex(), "fee": fee})
  return TradeRecord.from_json_dict_convenience(res["trade_record"])
```

sample:
```json
{
  "offer": "c69a7e9eb1e1fc7a85df169bccb76c1e135620d0f6dd414b476c73798625f8b6",
  "fee": 500
}
```

### `get_offer`

Given an offer's unique identifier, return that offer's details.

- **trade_id:** The ID of the offer to examine. Can be retrieved from an offer file by calling `cdv inspect spendbundles <offer_file>`.
- **file_contents:** Set to True to return a summary for the offer. Defaults to False, which only returns the offer's basic metadata.

```python
async def get_offer(self, trade_id: bytes32, file_contents: bool = False) -> TradeRecord:
  res = await self.fetch("get_offer", {"trade_id": trade_id.hex(), "file_contents": file_contents})
  offer_str = res["offer"] if file_contents else ""
  return TradeRecord.from_json_dict_convenience(res["trade_record"], offer_str)
```

sample:
```json
{
  "trade_id": "ae86b9f9b2d3b3f3c16609dc027f40716961fc6c98d50cfba24e344dd9c9d373",
  "file_contents": true
}
```

### `get_all_offers`

Gets all offers for the current wallet. Includes offers in every state.

- **file_contents** Set to True to return a summary for the offer. Defaults to False, which only returns the offer's basic metadata.

```python
async def get_all_offers(self, file_contents: bool = False) -> List[TradeRecord]:
  res = await self.fetch("get_all_offers", {"file_contents": file_contents})

  records = []
  optional_offers = res["offers"] if file_contents else ([""] * len(res["trade_records"]))
  for record, offer in zip(res["trade_records"], optional_offers):
    records.append(TradeRecord.from_json_dict_convenience(record, offer))

  return records
```

sample:
```json
{
  "file_contents": true
}
```

### `cancel_offer`

Cancel an offer with a specific identifier.

- **trade_id:** The ID of the offer to examine. Can be retrieved from an offer file by calling `cdv inspect spendbundles <offer_file>`.
- **fee:** An optional fee (in mojos) to include with the cancellation. Defaults to 0.
- **secure:** Defaults to True, which means "cancel on blockchain," ie spend the coins being offered and create new coin's in the Maker's wallet. Set to False to cancel locally. See [cancellation](#cancellation 'Offer cancellation') for more info.

```python
async def cancel_offer(self, trade_id: bytes32, fee=uint64(0), secure: bool = True):
  await self.fetch("cancel_offer", {"trade_id": trade_id.hex(), "secure": secure, "fee": fee})
```

sample:
```json
{
  "trade_id": "ae86b9f9b2d3b3f3c16609dc027f40716961fc6c98d50cfba24e344dd9c9d373",
  "fee": 500,
  "secure": false
}
```
