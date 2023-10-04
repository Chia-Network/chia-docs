---
title: Costs
slug: /coin-set-costs
---

Cost is a unit of measurement that is used to represent the available space in a block. It is measured by the amount of computing power required to execute the programs within it, as well as the physical drive space required to store data on each node's machine.

:::info
The maximum cost per block is 11,000,000,000 (11 billion), which is typically equivalent to around 400 KB of space. However, not every block is completely full.

It is important to keep the cost usage of programs on the Chia blockchain as low as possible, to minimize the network pressure and resulting fees incurred.
:::

## Cost Calculation

Every CLVM program uses a certain amount of cost during execution, based on the operators and the values they are called on. You can refer to the [Cost page](https://chialisp.com/costs) on the Chialisp website to learn more about the cost of various CLVM operators.

Additionally, certain conditions in a coin spend have a cost associated with them as well. A few common examples are [`CREATE_COIN`](/conditions#create-coin) and [`AGG_SIG_ME`](/conditions#agg-sig-me), which are expensive operations.

Finally, each byte of data that gets added to the blockchain has a cost of 12,000. Spend bundles are created using a serialized format of CLVM programs, calculated by running [opc](https://chialisp.com/commands#serialize) on the original CLVM program. Each two-digit pair of this format is equivalent to one byte, which costs 12,000 to store on the blockchain.

Aside from cost, the maximum number of atoms and pairs (counted separately) in a CLVM program is 2^31 apiece. If this threshold is exceeded, the program will terminate. However, this is likely a moot point, since it's extremely unlikely to write a program with this many atoms or pairs without exceeding the maximum cost per block.

## Minimum Specs - Farming {#farming-spec}

The minimum spec machine to run a full node is the Raspberry Pi 4. How do we know if this machine can stay synced? The worst case scenario occurs when multiple full transaction blocks are created with the minimum amount of time between them. This will temporarily put maximum load on the system. If the Pi can stay synced in this scenario, then it easily should be able to stay synced under normal load.

The first question we must answer is how much time elapses between transaction blocks. Chia's consensus mandates that at least three signage points must be reached before infusion_iterations may occur, so the minimum time between blocks is the following:

```
3 signage points * signage point time
3 signage points * (600 seconds per sub-slot / 64 signage points per sub-slot)
3 signage points * 9.375 seconds per signage point
```

Which is 28.125 seconds.

:::note
The **average** time between transaction blocks is [51.95 seconds](/consensus-foliage#transaction-block-time). The lower a given time interval between transaction blocks (down to 28.125 seconds), the lower the probability of a transaction block being created in that time interval.
:::

A transaction block is considered "full" when it contains 2000 outputs. For this document, we'll assume this translates to 1000 vanilla transactions, each with two inputs and two outputs. This would give the network an average of 19.25 (1000/51.95) transactions per second.

:::note
A transaction with only one input and one output is also possible. In theory, a block could therefore hold up to 2000 transactions, in which case the network would process an average of 38.5 (2000/51.95) transactions per second.
:::

With this goal in mind, Chia has created a **generator program** that processes 2000 compressed inputs and outputs. This program simulates a "full block".

To calculate the total amount of time for a Raspberry Pi 4 to process a full block, we must take into account three factors:

- The time required to run the generator program (2000 inputs and outputs)
  - The Raspberry Pi 4 accomplishes this in 5.2 seconds
- The time required to validate 2000 public keys
  - 2.2 seconds
- The time required to validate 2000 aggregate signatures
  - 10.63 seconds

Therefore, the total amount of time required for a Raspberry Pi 4 to process a full block is 5.2 + 2.2 + 10.63 = 18.03 seconds. This is 10.095 seconds faster than the minimum time between blocks, and 33.92 seconds faster than the average. When considering other factors such as network latency and time required to fetch a full proof ([640 ms on a slow HDD](/proof-of-space#farming)), this still allows plenty of leeway for a Raspberry Pi 4 to stay synced and collect farming rewards.

## Minimum Specs - Syncing {#syncing-specs}

As a benchmark, we use the Raspberry Pi 4, Chia's minimum spec machine for farming. A Raspberry Pi 4 has four cores, so it can validate a pre-existing block in 18.03 / 4 = 4.5075 seconds, which is around 11.5 times the average real-time rate of 51.95 seconds. Even in the worst-case scenario where every transaction block is full, the Pi can sync faster than the chain is being created.

## Maximum Block Cost {#max-block-cost}

Now that we've established that a Raspberry Pi 4 can, indeed, sync and farm, even when every transaction block is full, we'll calculate the maximum cost per block.

There are three categories that go into determining a block's maximum cost:

1. Generator program cost, which is split into two parts
   - Execution cost
   - Signature validation cost
2. Generator program size (each byte has a cost)
3. Generator program coins (each new coin has a cost)

In the case of calculating the maximum cost, these three categories are to be given equal weight. We'll go through each of the categories individually.

#### Generator Execution

(This is the first half of 1, above.)

An Intel Macbook Pro was used as a reference platform to determine baseline costs based on CPU usage. The costs were then hand-tweaked for various reasons:

- To ascribe additional cost to operations that allocate memory, i.e. the operand per-byte cost was inflated. This additional cost is called `MALLOC_PER_BYTE_COST` and amounts to 10 cost per byte.
- The especially CPU intensive BLS operations (`point_add` and `pubkey_for_exp`) had their cost inflated to not differ too much from the Raspberry Pi 4.
- Some operations that do not allocate memory and end up being common in relatively simple programs had their cost deflated. Specifically, `if`, `cons`, `listp`, `first`, and `rest`.

The result is that the generator program has an execution cost of 1 317 054 957.

#### Generator Signature Validation

(This is the second half of 1, above.)

The signature validation cost is based on computation time. BLS operations involve public key and aggregate signature validation, which are multiplied by the number of outputs.

- Time per public key validation: 0.179370 ms
- Time per aggregate signature validation: 0.972140 ms
- Total time for 2000 key and signature validations: (0.179370 + 0.972140) \* 2000 = 2303.02 ms

Each 1 cost is designed to require 1 nanosecond, so we need to multiply the result by 1 million (ns/ms).

- Cost for the generator program's BLS operations: `2303.02 * 1 000 000 = 2 303 020 000`.

Using this info, we can also calculate the cost of each `AGG_SIG_UNSAFE` and `AGG_SIG_ME` condition in all CLVM programs:

- Cost per BLS condition: `(0.179370 + 0.972140) * 1 000 000 = 1 151 510`. We round this number up to 1 200 000.

### Generator Cost {#generator-cost}

(This is the total cost of 1, above.)

Taking the previous two calculations into account, the total cost to execute and run the BLS operations of the generator program is: `1 317 054 957 + 2 303 020 000 = 3 620 074 957`.

### Generator Program Size {#generator-size}

(This is the cost of 2, above.)

We know that 1, 2, and 3 all will be assigned equal maximum costs, which we've already established is 3 620 074 957. This is the size-based cost of the generator program.

The generator program itself is 298 249 bytes. Each byte, therefore has a cost of `3 620 074 957 / 298 249 = 12 137.76`. We round this number to 12 000 per byte. This is the cost per bye of all CLVM programs.

### Generator Program Coins

(This is the cost of 3, above.)

Just like the previous calculation, the total cost of the generator program's coins is 3 620 074 957. The generator program creates 2000 coins, so the cost per `CREATE_COIN` in all CLVM programs is `3 620 074 957 / 2000 = 1 810 037.4785`. We round this number to 1 800 000.

### Maximum Cost Per Block

To calculate the maximum cost per block, we simply add the generator program's execution, size, and coin costs:

Theoretical maximum cost per block: `3 620 074 957 + 3 620 074 957 + 3 620 074 957 = 10 860 224 871` We round this number to 11 000 000 000.

### Maximum Block Size

The theoretical maximum size of a single block is `maximum cost per block / cost per byte`, or `11 000 000 000 / 12 000 = 916 667 bytes`. However, this number ignores the costs of all operators. If you want a CLVM program to do anything useful, the maximum size would be closer to 400 KB.

Even this number is not realistic because it assumes that a single program will take up an entire block. The maximum number of vanilla transactions (with two outputs) per block is 1000. Therefore, if there is fee pressure on Chia's blockchain, a 400 KB program would need to include a larger fee than the top 1000 vanilla transactions in the mempool -- combined -- in order for a farmer to include it.
