---
slug: /conditions
title: Conditions
---

When a coin is spent, its puzzle is executed on the Chialisp Virtual Machine (CLVM). If the program does not fail, it returns a list of conditions. These conditions determine what the outcome of the spend is, and whether or not the spend is valid.

Puzzles have no access to the outside world, or even to blockchain parameters like block height. Therefore, to interact with the outside environment, they return a list of conditions, each of which must be valid in order for the spend itself to be valid.

There are two kinds of conditions. Some require something to be true (such as time passing) in order for the spend to be valid. And others cause something to happen if the spend is valid (such as the creation of new coins).

For detailed information about conditions please review the [Chialisp Conditions page](https://chialisp.com/conditions/)