---
title: Harvester Protocol
slug: /chia-blockchain/protocol/harvester-protocol
---

[Harvester protocol source](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/harvester_protocol.py)

The harvester protocol defines the messages sent between a farmer service and a harvester service. These tend to
be on the same machine for small farmers, but for medium or large farmers they can be in multiple machines.

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

This message is a notification from the farmer to the harvester of a new challenge.
The harvester first checks which plots pass the plot filter (see the [Harvester Algorithm page](/chia-blockchain/consensus/chains/harvester-algorithm)), and for those that do, fetches the quality.
This requires around 7-9 random reads (and thus disk seeks) for each quality.
Each plot is expected to have one proof of space (and therefore one quality) on average, so for 50 plots, a harvester would have around 50 qualities.
For those qualities that are sufficiently good to win a block or a pool partial, the whole proof is fetched (64 random reads in the plot),
and then `new_proof_of_space` is sent to the farmer.

```python
class NewSignagePointHarvester(Streamable):
    challenge_hash: bytes32     # The challenge hash for the sub slot in which the signage point lies
    difficulty: uint64          # The current blockchain difficulty
    sub_slot_iters: uint64      # The current blockchain sub-slot iters
    signage_point_index: uint8  # The signage point's index, from 0 to 63. 0 for an end of sub slot signage point
    sp_hash: bytes32            # The hash of the signage point, this is == challenge_hash iff the index is 0
    pool_difficulties: List[PoolDifficulty]    # List of each pool the farmer is in, and what the difficulty is for that pool


class PoolDifficulty(Streamable):
    difficulty: uint64                  # The current difficulty that is set for plots belonging to this pool contract
    sub_slot_iters: uint64              # The pool sub slot iters, which is static for each network (mainnet, testnet)
    pool_contract_puzzle_hash: bytes32  # The pool contract puzzle hash which can be in many plots
```

## new_proof_of_space

A successful proof of space that is sent to the farmer. The `challenge_hash`, `sp_hash`, and `signage_point_index`
correspond to the ones sent in `new_signage_point_harvester`. Many proofs can be submitted for each signage point.

The plot is a string chosen by the harvester to represent the winning plot (and proof index) in future communications
between the farmer and harvester. This can be, for example, the filename of the plot with an additional byte for the index.
This is relevant, because a certain plot can potentially have more than one proof for each signage point, and we want
communications for each proof to be separate and not conflict (specifically to fetch signatures from the harvester).

```python
class NewProofOfSpace(Streamable):
    challenge_hash: bytes32
    sp_hash: bytes32
    plot_identifier: str
    proof: ProofOfSpace         # The actual proof of space which contains more data, shown below
    signage_point_index: uint8

class ProofOfSpace(Streamable):
    challenge: bytes32                              # This is the challenge for the pospace, explained in the Signage and Infusion Points page
    pool_public_key: Optional[G1Element]            # Only one of these two should be present
    pool_contract_puzzle_hash: Optional[bytes32]    # Present only for pooled plots
    plot_public_key: G1Element                      # Explained in the keys section
    size: uint8                                     # k size, usually 32 but can vary
    proof: bytes                                    # proof bytes, 64 k bit values, total size 8k bytes
```

## request_signatures

This is a request from the farmer to the harvester for a signature from the plot key, for a specific plot (using the
plot identifier from `new_proof_of_space`). The farmer can request signatures from multiple messages.

```python
class RequestSignatures(Streamable):
    plot_identifier: str
    challenge_hash: bytes32
    sp_hash: bytes32
    messages: List[bytes32]
```

## respond_signatures

This is a response to `request_signatures`. The local public key is the public key corresponding to the secret key
in the plot. To see more about the keys for plots, look at the [BLS Keys page](/chia-blockchain/keys/keys-and-signatures).

```python
class RespondSignatures(Streamable):
    plot_identifier: str
    challenge_hash: bytes32
    sp_hash: bytes32
    local_pk: G1Element   # Key in the plot
    farmer_pk: G1Element  # Key controlled by farmer
    message_signatures: List[Tuple[bytes32, G2Element]]
```

## request_plots

A request from the farmer to the harvester for the list of all plots being farmed by the harvester.

```python
class RequestPlots(Streamable):
    pass
```

## respond_plots

A response to `request_plots` request. This message is also sent whenever a new plot is loaded.

```python
class RespondPlots(Streamable):
    plots: List[Plot]
    failed_to_open_filenames: List[str]  # Filenames for files which cannot be opened
    no_key_filenames: List[str]          # Filenames for files which cannot be farmed by this farmer

class Plot(Streamable):
    filename: str
    size: uint8
    plot_id: bytes32
    pool_public_key: Optional[G1Element]
    pool_contract_puzzle_hash: Optional[bytes32]
    plot_public_key: G1Element
    file_size: uint64
    time_modified: uint64

## Plot Filter Computation (Chia 2.5.5+)

Starting in Chia 2.5.5, the harvester protocol has been optimized to ensure that plot filter computation is performed directly on the harvester for improved efficiency and reduced network overhead.

### Enhanced Plot Filter Processing

**Available in**: Chia 2.5.5 and later versions

The harvester now performs optimized plot filter computation using the formula:

`plot filter bits = sha256(plot_id + challenge_hash + sp_hash)`

**Benefits of Harvester-Side Computation**:
- **Reduced Network Traffic**: Plot filter computation happens locally on the harvester
- **Improved Performance**: Faster response times for plot filtering decisions
- **Better Scalability**: Reduced load on the farmer service
- **Chip 48 Preparation**: This optimization prepares the network for future Chip 48 enhancements

**Implementation Details**:
- Plot filter computation is performed entirely on the harvester
- Only plots that pass the filter (starting with 9 zeroes) proceed to quality lookups
- This optimization maintains the same cryptographic security while improving performance
```
