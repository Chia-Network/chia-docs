---
sidebar_position: 7
---

# 4.7 Coin Set vs Account

In the account model used in many blockchains such as Ethereum, Solana and Algorand, balances are kept in accounts. These are permanent data structures which do not get destroyed when they send funds.

In this section, we'll focus on Ethereum and how its account model compares with Chia's coin set model.

## Ethereum's account model

In terms of keeping track of state, Ethereum's account model functions similarly to legacy banks. Accounts, balances and smart contracts are persisted on the blockchain.

Accounts and contracts have money associated with them. The source code governing how money may be spent is a first class object.

A typical Ethereum transaction would look like the following:

Alice wants to send 1 eth to Bob. To complete this transaction, 1 eth is subtracted from Alice's balance, and 1 eth is added to Bob's balance. There is no need to calculate the history of how Alice acquired 1 eth prior to this transaction. In order for the transaction to be processed, the system only needs to know that Alice's balance was at least 1 eth.

## Chia's coin set model

In Chia's coin set model, there are no accounts or balances. There are only coins (see [Section 4.1](/docs/04coin-set-model/intro "Section 4.1 Coin set info") for more info). Coins are first class objects; they are the only data that is persisted on the blockchain. Each coin has a parent, allowing for its history to be tracked to its coinbase.

A typical Chia transaction would look like the following:

Alice wants to send 1 XCH to Bob. Alice has five coins in her wallet: four worth 0.2 XCH apiece, and one worth 0.7 XCH. Her wallet automatically selects two of the coins worth 0.2 XCH and the 0.7 XCH coin to be spent. All three coin spends happen simultaneously, along with two new coin creations: one worth 1 XCH which goes to Bob's wallet, and one worth 0.1 XCH which goes to Alice's wallet as "change." Alice now has two coins worth 0.2 XCH and one worth 0.1 XCH. Bob has one coin worth 1 XCH. The total value owned by Alice and Bob has not changed -- it was 1.5 XCH both before and after the transaction was processed.

Owner | Before            | After
----- | ----------------- | -------
Alice | 1.5 XCH (5 coins) | 0.5 XCH (3 coin)
Bob   |   0 XCH           | 1.0 XCH (1 coin)
      |                   | 
Total | 1.5 XCH           | 1.5 XCH

## Advantages of the account model

### Monetary fungibility

#### Account

An account only has a balance, so it's difficult to make a logical case that some money should be treated differently than other money. Money is "mixed" by default.

#### Coin set

Coins can be combined by spending them, but they cannot be "mixed" by adding a balance to an account. This means that some coins might be viewed differently than others, even if they have the same value.

This has already happened with Bitcoin. Due to its high energy consumption, some people have refused to buy bitcoins that can be traced to mining with fossil fuels. This affects Bitcoin's fungibility because not all coins are viewed equally.

### Ease of programming

#### Account

Solidity shares similar paradigms in programming to web development, so there is a large pool of programmers who can learn it fairly quickly. When programming a smart contract, the programmer can simply store all balances in an array. Transactions involve little more than adding to, and subtracting from, balances. All other logic is contained within the same program. It's simple to combine multiple transactions that affect the same program in the same block.

#### Coin set

Transactions might involve spending and creating many coins, so a programmer must think about the rules governing how coins may be spent, and how coins will interact with each other. This makes programming in Chia more difficult than in Ethereum. However, auditing is much easier in Chia (see [Section 4.8](/docs/04coin-set-model/clvm_vs_evm "Section 4.8 CLVM vs EVM") for more info).

----

## Advantages of the coin set model

### Scalability

#### Coin set

Because verification is built into the coin set model, so is scaling. If a coin's "owner" loses the private key required to spend the coin, the coin becomes unspendable. However, the overall system is unaffected, so scaling does not become more difficult.

Additionally, because each coin spend is independent, the system is very parallelizable.

#### Account

If an account's owner loses their private key, then any code or messages referring to that account cannot be processed. This can be propagated across the entire system, making solutions such as sharding more difficult.

### Privacy

#### Coin set

With a click of a button, a user can add a new address for each transaction; each new coin can be stored in a different address. This makes blacklisting difficult.

#### Account

Each user typically has just one account. It's possible to create additional accounts in order to use more than one address. However, high fees typically discourage users from doing this. Also, it's easy to blacklist an ETH address.

### Determinism

#### Coin set

Coins can only be spent once, making the results deterministic (if you run the same program multiple times, you'll get the same result each time). Because of this, re-applying mempool transactions after a new block is not necessary.

Note, however, that smart coins _could_ be designed such that multiple people could spend the same coin, which would potentially reduce determinism for those coins.

#### Account

Multiple people can execute the same code within a smart contract. The order of execution could affect the results, which therefore reduces determinism.

### Sandboxing

#### Coin set

Coin value is split between many coins, increasing sandboxing, and therefore security. One program cannot call or affect another. If a coin is hacked, only that coin's owner can have money stolen.

#### Account

Value is stored within a single account or contract. Multiple people can execute the same smart contract code. If a contract is hacked, everyone who participates could have money stolen.

### Database size

#### Coin set

Programmable features are not stored directly on chain. Instead, coins use hashing to allow for later verification of their contents.

Chia's database is expected to grow by around 30 GB annually, which is roughly the same rate as Bitcoin's. Kryder's Law dictates that storage capacity will grow exponentially in the short-to-medium term, whereas the database will grow linearly. In early 2022, an SSD capable of storing Chia's database cost less than $50. This should hold true for the foreseeable future, even as Chia's database continues to expand.

#### Account 

User account information, as well as transaction data, is small. However, smart contracts are stored on chain. Because of this, Ethereum's database will likely grow more rapidly than Bitcoin's or Chia's.