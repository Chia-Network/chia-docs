---
sidebar_position: 2
---

# 4.2 条件

> Conditions

chia 中的拼图必须是有效的 clvm 程序。这些程序由 clvm 解释器执行，它们必须要么失败，要么返回一个**条件**列表。回想一下，每次花费一枚硬币都必须运行一个拼图，即与该硬币相关的拼图。

CLVM 程序无法访问外部世界，甚至无法访问区块高度等区块链参数。因此，为了与外部环境交互，它们返回一个条件列表，这些条件必须有效才能使支出本身有效。条件分为两类：“此支出仅在 X 时有效”和“如果此支出有效则 X”。

这是条件及其格式和行为的完整列表。

* **AGG_SIG_UNSAFE - [49] - (49 pubkey message)**：仅当附加的聚合签名包含来自给定消息的给定公钥的签名时，此支出才有效。这被标记为不安全，因为如果您对一条消息进行一次签名，则您拥有的任何其他需要该签名的硬币也可能会被解锁。由于硬币 ID 引入的自然熵，最好仅使用 AGG_SIG_ME。
* **AGG_SIG_ME - [50] - (50 pubkey message)**：仅当附加的聚合签名包含来自该消息的指定公钥的签名与硬币的 ID 和网络的创世挑战连接时，此支出才有效。
* **CREATE_COIN - [51] - (51拼图哈希金额)**：如果此支出有效，则使用给定的拼图哈希和数量创建一个新硬币。
* **ASSERT_FEE - [52] - (52 amount)**：仅当此交易中未使用的价值等于 *amount* 时，此支出才有效，该金额明确用作费用。
* **CREATE_COIN_ANNOUNCEMENT - [60] - (60 message)**：如果此支出有效，则会创建一个临时公告，其 ID 取决于创建它的代币。其他币然后可以断言存在用于块内币间通信的公告。
* **ASSERT_COIN_ANNOUNCEMENT - [61] - (61 noticeID)**：只有在此区块中有与announcementID 匹配的公告时，此支出才有效。
announcementID 是宣布消息的哈希值与宣布它的硬币的硬币 ID 连接起来`announcementID == sha256(coinID + message)`。
* **CREATE_PUZZLE_ANNOUNCEMENT - [62] - (62 message)**：如果此支出有效，则会创建一个临时公告，其 ID 取决于创建它的谜题。其他币然后可以断言存在用于块内币间通信的公告。
* **ASSERT_PUZZLE_ANNOUNCEMENT - [63] - (63 noticeID)**：只有在此区块中有与announcementID匹配的公告时，此支出才有效。
announcementID 是宣布的消息与宣布它的硬币的拼图哈希连接`announcementID == sha256(puzzle_hash + message)`。
* **ASSERT_MY_COIN_ID - [70] - (70 coinID)**：仅当提供的硬币 ID 与包含此拼图的硬币 ID 完全相同时，此支出才有效。
* **ASSERT_MY_PARENT_ID - [71] - (71 parentID)**：只有当提供的父代币信息与包含此拼图的代币的父代币信息完全相同时，此支出才有效。
* **ASSERT_MY_PUZZLEHASH - [72] - (72puzzlehash)**：仅当提供的拼图哈希与包含此拼图的硬币的拼图哈希完全相同时，此支出才有效。
* **ASSERT_MY_AMOUNT - [73] - (73 amount)**：仅当显示的金额与包含此拼图的硬币的数量完全相同时，此支出才有效。
* **ASSERT_SECONDS_RELATIVE - [80] -（80 秒）**：此支出仅在自该硬币创建后经过给定时间后才有效。硬币的创建时间或“生日”由前一个块的时间戳定义*而不是创建它的实际块。类似地，在评估这些时间锁时，前一个块的时间戳用作当前时间。
* **ASSERT_SECONDS_ABSOLUTE - [81] - (81 time)**：仅当此区块上的时间戳大于指定的时间戳时，此支出才有效。同样，硬币的生日和当前时间由前一个块的时间戳定义。
* **ASSERT_HEIGHT_RELATIVE - [82] - (82 block_age)**：此支出仅在自该硬币创建以来经过指定数量的区块时才有效。
* **ASSERT_HEIGHT_ABSOLUTE - [83] - (83 block_height)**：此支出仅在达到给定的 block_height 时才有效。 

可以在[此处](https://chialisp.com/docs/standard_transaction)找到真实世界 chialisp 程序的示例。

<details>
<summary>原文参考</summary>

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

</details>
