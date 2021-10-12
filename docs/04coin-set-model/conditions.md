---
sidebar_position: 2
---

# 4.2 Conditions

Puzzles in chia must be valid clvm programs. These programs are executed by the clvm interpreter, and they must 
either fail, or return a list of **conditions**.  Recall that every spend of a coin must run exactly one puzzle,
the puzzle associated with that coin. 

CLVM programs have no access to the outside world, or even to blockchain parameters like block height. Therefore, to
interact with the outside environment, they return a list of conditions, which must be valid in order for the spend
itself to be valid. Conditions are split into two categories: "this spend is only valid if X" and "if this spend is valid then X".

Here is the complete list of conditions along with their format and behaviour.

* **AGG_SIG_UNSAFE - [49] - (49 pubkey message)**: This spend is only valid if the attached aggregated signature contains a signature from the given public key of the given message. This is labeled unsafe because if you sign a message once, any other coins you have that require that signature may potentially also be unlocked. It's probably better just to use AGG_SIG_ME because of the natural entropy introduced by the coin ID.
* **AGG_SIG_ME - [50] - (50 pubkey message)**: This spend is only valid if the attached aggregated signature contains a signature from the specified public key of that message concatenated with the coin's ID and the network's genesis challenge.
* **CREATE_COIN - [51] - (51 puzzlehash amount)**: If this spend is valid, then create a new coin with the given puzzlehash and amount.
* **ASSERT_FEE - [52] - (52 amount)**: This spend is only valid if there is unused value in this transaction equal to *amount*, which is explicitly to be used as the fee.
* **CREATE_COIN_ANNOUNCEMENT - [60] - (60 message)**: If this spend is valid, this creates an ephemeral announcement with an ID dependent on the coin that creates it. Other coins can then assert an announcement exists for inter-coin communication inside a block.
* **ASSERT_COIN_ANNOUNCEMENT - [61] - (61 announcementID)**: This spend is only valid if there was an announcement in this block matching the announcementID.
The announcementID is the hash of the message that was announced concatenated with the coin ID of the coin that announced it `announcementID == sha256(coinID + message)`.
* **CREATE_PUZZLE_ANNOUNCEMENT - [62] - (62 message)**: If this spend is valid, this creates an ephemeral announcement with an ID dependent on the puzzle that creates it. Other coins can then assert an announcement exists for inter-coin communication inside a block.
* **ASSERT_PUZZLE_ANNOUNCEMENT - [63] - (63 announcementID)**: This spend is only valid if there was an announcement in this block matching the announcementID.
The announcementID is the message that was announced concatenated with the puzzle hash of the coin that announced it `announcementID == sha256(puzzle_hash + message)`.
* **ASSERT_MY_COIN_ID - [70] - (70 coinID)**: This spend is only valid if the presented coin ID is exactly the same as the ID of the coin that contains this puzzle.
* **ASSERT_MY_PARENT_ID - [71] - (71 parentID)**: This spend is only valid if the presented parent coin info is exactly the same as the parent coin info of the coin that contains this puzzle.
* **ASSERT_MY_PUZZLEHASH - [72] - (72 puzzlehash)**: This spend is only valid if the presented puzzle hash is exactly the same as the puzzle hash of the coin that contains this puzzle.
* **ASSERT_MY_AMOUNT - [73] - (73 amount)**: This spend is only valid if the presented amount is exactly the same as the amount of the coin that contains this puzzle.
* **ASSERT_SECONDS_RELATIVE - [80] - (80 seconds)**: This spend is only valid if the given time has passed since this coin was created. The coin's creation time or "birthday" is defined by the timestamp of the previous block *not* the actual block in which it was created. Similarly, the previous block's timestamp is used as the current time when evaluating these time locks.
* **ASSERT_SECONDS_ABSOLUTE - [81] - (81 time)**: This spend is only valid if the timestamp on this block is greater than the specified timestamp. Again, the coin's birthday and the current time are defined by the timestamp of the previous block.
* **ASSERT_HEIGHT_RELATIVE - [82] - (82 block_age)**: This spend is only valid if the specified number of blocks have passed since this coin was created.
* **ASSERT_HEIGHT_ABSOLUTE - [83] - (83 block_height)**: This spend is only valid if the given block_height has been reached.


An example of a real world chialisp program can be found [here](https://chialisp.com/docs/standard_transaction).