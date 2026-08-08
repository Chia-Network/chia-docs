---
slug: /dao-known-issues
title: DAO Known Issues
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DAOs are currently under development. Be sure to read this list carefully before using the DAO primitive.

As of Chia version 2.1.4, the following DAO issues are known to exist:

## Proposal Spam

Under normal circumstances, an attacker can create a malicious proposal to drain the DAO of its treasury. However, even if the attacker has secured enough `YES` votes to meet the `attendance_required` threshold to pass the proposal, the `soft_close_length` will protect against this type of attack. As long as a sufficient number of `NO` votes are added prior to the expiration of the `soft_close_length`, the proposal (and the attack) will fail.

However, prior to creating this proposal, the attacker can use proposal spam to improve the chances of the attack's success.

The DAO wallet subscribes to `PROPOSAL` coins by hinting the `TREASURY_ID` in the `memos` field upon the coin's creation. To release the coins, launch the wallet from `main`, and then run the [release_coins](/dao-cli#release_coins) command.

- There is a limit on the number of items a `full_node` will return to a wallet based on a subscribed puzzle_hash (including hinted coins): \* `trusted_max_subscribe_response_items`: 500000 \* `max_subscribe_response_items`: 100000
- Mitigation: This issue only exists in the 2.1.2 release.

The attacker can take advantage of this limit by creating multiple coins, each of which contains a hint equal to the `TREASURY_ID`. Eventually a wallet will no longer get any additional coin states for newer coins from a `full_node` via the coin state subscription. This is the "proposal spam" part of the attack.

If the attacker has created a sufficient number of the aforementioned coins to reach the subscription limit, the malicious proposal will be invisible to the wallets of every other DAO member. If the members are not alerted to the existence of the malicious proposal in some other way, the `soft_close_length` will eventually be reached, and the proposal will succeed.

## Fake Proposals to lock DAO CATs

An attacker can create spam proposals with the intent of locking DAO_CATs into voting mode permanently. There are two ways to accomplish this:

- Create otherwise valid `PROPOSAL` coins which don't meet the proposal minimum amount (e.g. 0 or 1 mojo coins).
- Create proposals without a timer coin.

In the event that such proposals are voted on by users, because the proposals can never be closed (even via self-destruct), any users who voted on these proposals will never be able to unlock the coins they voted with. Note that coins in this state could continue to be used to vote on other proposals.

The current mitigation to this is that the wallet will filter out any proposals which either don't meet the proposal minimum amount or don't have valid timer coins. It is strongly suggested to use the `show_proposal` command with any proposal that you intend to vote on, and check that it is valid.

## Changing a DAO's settings

Because each proposal is voted on and enacted independently, it is possible to have a situation where a proposal to change one or more of the DAO's settings passes while another proposal is active. In this case, the active proposal will take on the _new_ rules imposed by the proposal to change the DAO's settings. This situation could cause the existing proposal to fail, even if it would have passed under the original rules. Other side effects are also possible.

Because of this anomaly, a vote for a proposal to change the DAO's settings could affect any of the DAO's other active proposals. Therefore, members are strongly encouraged to examine all open proposals when deciding whether to vote for a proposal to change the DAO's settings.
