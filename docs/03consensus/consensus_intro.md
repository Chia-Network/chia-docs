---
sidebar_position: 1
---

# Chia Consensus Introduction

Decentralized consensus algorithms require Sybil resistance with a resource that is cryptographically verifiable and scarce (not infinite).
In previous blockchain systems the scarce resources have been computing power and stake.
Proof of space is an alternative that comes much closer to Bitcoin’s original 
ideal of “one cpu one vote” by using storage capacity as the scarce resource.
For example, someone storing 500GiB has 5 “votes,” someone storing 100GiB has 1 “vote”, where a vote refers to a chance to win and validate a block, not an actual vote on-chain.
Using only storage capacity however, is not secure.
One other cryptographic puzzle piece is used to secure this system: namely a verifiable delay function, which is a cryptographic proof that real time has passed.
A fair system can be created by combining proofs of space and time.
In such a system, users store random-looking data on their hard drives for periods of time and their chance to win Chia is proportional to their allocated space.
Furthermore, such a system scales to billions of participants in a similar way to the proof of work lottery.
No funds, special hardware, registration, or permission is required to join, only a hard drive.
And the system is completely transparent and deterministic -- anyone can efficiently and objectively verify which chain is the canonical one, without relying on any trusted parties.


Whenever signatures are referred to in this document, it is assumed that a deterministic BLS signature is used, following the IETF specification with the Augmented scheme.
The private keys performing these digital signatures are controlled and stored by the farmers, and a unique private key is used for each plot.
The hash function used is SHA256, except for the proofs of space which also use CHACHA8 and BLAKE3.
