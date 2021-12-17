---
sidebar_position: 2
---

# 10.2 Harvester Protocol
The harvester protocol defines the messages sent between a farmer service and a harvester service. These tend to
be one the same machine for small farmers, but for medium or large farmers they can be in multiple machines.

## harvester_handshake
The handshake between farmer and harvester.
A farmer sends this message to harvesters, to initialize them and tell them which
pool public keys and farmer public keys are acceptable to use.

A farmer can be connected to multiple harvesters, but a harvester should only have one farmer connection.
The harvester can start using plots which have these keys associated with them.

```python
class HarvesterHandshake(Streamable):
    farmer_public_keys: List[G1Element]
    pool_public_keys: List[G1Element]
```

## new_signage_point_harvester
PK

This message notifies the harvester of a new challenge.
The harvester looks up the challenge in each of the plots, and computes the quality.
This requires around 7 disk seeks for each quality.
Each plot is expected to have one proof of space on average, so for 50 plots, a harvester would have around 50 qualities.

``` python
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```


```Python
class ChallengeResponse:
    challenge_hash: bytes32
    quality_string: bytes32
    plot_size: uint8
```
The harvester sends a response to the farmer, with `ChallengeResponse` for each of the qualities found.

After receiving a `ChallengeResponse`, farmers can use the quality to compute the expected time required to finalize a block with this proof of space.
If this time is lower than a threshold (a small constant times expected block size), which means the proof of space is very good, the farmer can request the entire proof of space from the harvester through ```RequestProofOfSpace```.


```Python
class RequestProofOfSpace:
    quality_string: bytes32
```
The farmer requests the entire proof of space from the harvester, which will require more disk seeks (around 50).
This is done only for proofs with high quality.



```Python
class RespondProofOfSpace:
    quality_string: bytes32
    proof: ProofOfSpace
```
The harvester responds with the requested proof of space.
The farmer can now choose to request a partial for this proof (to send to a pool), or if the proof is extremely good, to make a block.
In order to make a block the farmer must request a block header from the full node using `RequestHeader` (which is in the farmer protocol), and then get a signature from the harvester using `RequestHeaderSignature`.


```Python
class RequestHeaderSignature:
    quality_string: bytes32
    header_hash: bytes32
```
The farmer requests a header signature for a header with the given hash.
The harvester signs the header using the locally stored private key.
This allows farmers to store their private keys in a more distributed way, with each harvester machine storing keys along with the plots.


```Python
class RespondHeaderSignature:
    quality_string: bytes32
    header_hash_signature: PrependSignature
```
The harvester responds with a BLS prepend signature on the header hash.


```Python
class RequestPartialProof:
    quality_string: bytes32
    farmer_target_hash: bytes32
```
The farmer requests a partial proof to be used for claiming pool rewards.
These are sent much more often than `RequestHeaderSignature`, since pool partials happen more often than good blocks.
The harvester signs that farmer target hash (target of funds) with the plot private key.


```Python
class RespondPartialProof:
    quality_string: bytes32
    farmer_target_signature: PrependSignature
```
The harvester responds with the signature, which the farmer can then send to the pool to claim funds.
