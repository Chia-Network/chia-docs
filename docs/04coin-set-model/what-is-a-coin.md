---
sidebar_position: 1
---

# 4.1 Coins, Puzzles and Solutions
The Chia blockchain, as explained in the consensus section, is a list of blocks that is agreed upon by nodes.
Nodes also maintain a table of **coins**. A coin in chia is a record of ownership of a certain amount of XCH, which 
can be unlocked by providing a puzzle and solution. 

The 3 properties in a coin are:

* **parent ID**: The coin ID of the parent coin. 
* **amount**: The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
* **puzzle_hash**: The hash of the puzzle that locks this coin.

The coin ID of this coin is computed by hashing together the concatenation of the three fields, where amount is encoded
in CLVM format. Therefore, coins can never be changed, they can only created and then spent once.


So what is a **puzzle**? Each coin has a CLVM (chialisp VM) program that is associated with it, which determines how, who,
and when this coin can be spent. This program is called the puzzle, and must be chosen at the time that the coin gets
created. If Bob wants to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows
how to unlock. For example, Bob can create a coin of value 5 XCH to Alice, with Alice's puzzle hash.

## Spends

When Alice wants to spend her coin, she creates a transaction that spends her coin, and reveals the original puzzle, and the solution
to that puzzle. The solution usually involves things like signatures, conditions, and recipients of the coin. Alice
is the only one that knows the solution to her puzzles, and thus she controls that coin. A basic example is that the
puzzle checks a digital signature, and the solution provides the signature. 


The network has no concept of coin ownership, anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:
* The coin ID
* The puzzle (full clvm source code)
* The solution to the puzzle
* An aggregate signature

For more detail on CLVM please look at [chialisp.com](http://chialisp.com).

## Account Model vs Coin Set Model
In the account model, which is used by Ethereum and many other systems, balances are kept in accounts, which are
permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the 
account model and the coin set model (also called UTXO model).

### Benefits of account model
* Users and wallets only have to keep track of 1 account for all of their balance.
* All logic and state can be in one program and one account, simplifying development.

### Benefits of coin set model
* Very parallelizable since each coin spend is independent.
* Coin value is split between many coins, increasing sandboxing and security. One program cannot call or affect another.
* Deterministic operation of every spend.
* More efficient storage of state  (although this depends on implementation)