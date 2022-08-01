---
sidebar_position: 3
---

# 4.3 Conditions

Puzzles in Chia must be valid CLVM programs. These programs are executed by the CLVM interpreter, and they must either fail, or return a list of **conditions**. Recall that every spend of a coin must run the puzzle associated with that coin.

CLVM programs have no access to the outside world, or even to blockchain parameters like block height. Therefore, to interact with the outside environment, they return a list of conditions, each of which must be valid in order for the spend itself to be valid. Conditions are split into two categories: "this spend is only valid if X" and "if this spend is valid then X".

For a complete list of conditions, along with their format and behavior, please see [Chialisp.com](https://chialisp.com/docs/coins_spends_and_wallets#conditions 'Conditions in Chialisp').

Chialisp.com also contains information on the construction of [the standard transaction](https://chialisp.com/docs/standard_transaction).
