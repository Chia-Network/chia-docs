---
slug: /coin-set-security
title: Security
---

When creating smart coins, security concerns should be at the front of your mind. The language is specifically designed to secure money on a network with _no centralized authority_ to enforce rules. The only thing standing in the way of attackers and potentially large sums of money is how you design smart coins.

## Signing the Solution {#signing}

When you push a transaction, it gets gossiped to other nodes until it finds one who will put it into a block. Every node chooses what will be passed on to the next node. If it likes, it can change some data before it forwards it.

This is why the aggregated signature is part of the spend bundle. It allows you to mark data as valid only if there is also a signature that vouches for its correctness. Signatures are how you prevent nodes from changing your transaction in malicious ways. If they do, the spend will no longer be valid.

Signing is especially important when looking at solution values. The puzzle reveal is secured by the puzzle hash on the coin. The solution, however, can be anything. Most of the time when you are spending a coin, the output conditions are passed in somehow through the solution. If you don't sign those conditions (or the delegated puzzle that generates them) you must assume that an attacker is going to notice and attempt to substitute their own values.

Sometimes, it is necessary to have solution values that logistically cannot be signed, but also should not be changed. In scenarios like these, you should try to have a signed coin use announcements to assert that the coin is being spent with the correct information.

## Asserting Coin Information {#asserting}

Signing is how you prevent nodes from messing with your own spends, but sometimes you want to create coins that will be traded around with specific rules. As a result, you don't know who will be spending the coin, and you don't know if they will be honest.

Using [inner puzzles](/guides/chialisp-inner-puzzles), you can enforce rules on your child coins by [currying](/guides/chialisp-currying) and wrapping tree hashes. However, there are times when you also want to enforce truths about yourself or your parent.

This is where the `ASSERT_MY_*` family of condition opcodes comes in. When you need information (`parent_coin_info`, `puzzle_hash`, `amount`) about your coin to use in the puzzle, it cannot always be curried in by an honest party. Sometimes, it will need to be passed in through the solution.

The solution should always be treated as if it is being solved by malicious or careless parties. If any coin information is being passed in, it should be asserted with opcodes to ensure that the network, who can see that information, can confirm it.

Keep in mind that `ASSERT_MY_COIN_ID` will actually implicitly assert all three of the pieces of information in a coin. The same is true of `ASSERT_MY_PARENT_ID` for parent coins, which is particularly useful since there is no such thing as `ASSERT_MY_PARENT_PUZZLE_HASH`, for example.

## Replay Attacks {#replay}

Another huge concern when creating your spends is whether they will be valid if parts of them are excluded or reused. This kind of attack is the reason why `AGG_SIG_UNSAFE` is labeled the way it is.

If you sign something with `AGG_SIG_UNSAFE`, the only data that is being signed is the message you are trying to sign. Once you sign and push it, that signature lives on the blockchain forever. If you later create a puzzle that is locked up with the need for the same signature, an attacker can find the signature you used last time and reuse it.

This is why you should try to always use `AGG_SIG_ME` if possible. Not only does it make you commit to the coin ID in the signature (something that is unique to every spend), but it also commits to the genesis challenge of the network you are on. A revealed signature for a coin on testnet could be replayed in mainnet otherwise.

Exclusion should also be a concern at the forefront of your mind. Oftentimes, you will be spending multiple coins in the same bundle, and they should all be tied together into one aggregated signature. If you have good reason not to sign one of them, make sure you know what happens if it gets excluded from the bundle.

Furthermore, aggregated signatures can't be disaggregated into smaller signatures _unless_ you have previously signed one of the smaller combinations of public key-message pairs in the bundle. The attacker can exclude the rest of the transactions that contain `AGG_SIG` conditions and reuse the smaller signature again on the remaining transactions. They can also calculate the remaining aggregated signature and perhaps sign every spend except the one the exclude. This is known as **signature subtraction** and is another great reason to use `AGG_SIG_ME` as much as possible.

## "Flash Loan from God" Attack {#flash-loans}

An interesting angle that also has to be considered during the building of your coins is how their security holds up if a party that is spending them has infinite money. This may seem ridiculous except that cryptocurrency enables **flash loans** to exist which are instant loans of money with no conditions except that they are returned to the owner within the same block.

Take for example, a piggybank coin that only allows you to withdraw funds once the amount of the piggybank has grown to a determined savings goal. If a person wants to retrieve their funds early, they can borrow money equal to their savings goal, cash out the piggybank, and then return the money that they borrowed.

There's also potential to use vast sums of borrowed money to influence the price of something, if that price is calculated programmatically. If you have enough money, you can singularly simulate a bunch of trades to influence the price calculation to the price you desire, make a transaction at that price, and then return all of the money you borrowed to simulate trading while keeping the profits.

Fortunately, this attack has a relatively easy fix, and that is to add an `(ASSERT_HEIGHT_RELATIVE 1)` condition to prevent the money from being returned in the same block.

## Puzzle and Solution Reveals {#reveals}

Remember to think about when puzzles and solutions are revealed. They are revealed only at spend time of the coin that is committed to them. The only thing that the network sees prior to that is the parent coin and the puzzle hash. This can be an advantage, since you can hide sensitive information for spending the coin inside the puzzle hash before it is ever revealed. However, once the puzzle is revealed, it's revealed forever, so that sensitive information cannot be considered sensitive again.

Also keep in mind that if a parent coin is currying information to its child coin before it creates it, that will be public before the child coin is spent. For some wallets, this is an advantage since you may want certain data about a coin's puzzle to calculate whether or not it's yours. However, if you were trying to use a plain-text password, that won't be very secure.
Instead, make sure to pre-commit to things with hashes and then assert that they are revealed correctly later.

## Conclusion

Hopefully you have a better idea of what risks are involved when creating a smart coin. It's very worth your time to try and exploit your puzzles by passing in dangerous solutions or leaving out transactions/signatures.

You're not just trying to protect against bad actors, but also against people accidentally bricking their coins. Puzzles are usually pretty permanent, so it's worth the extra time.
