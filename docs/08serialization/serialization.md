---
sidebar_position: 1
---
# Serialization
Serialization in Chia refers to how objects are converted into bytes for uses like: transmitting to other nodes,
storing on disk, or hashing objects. For example, a header_hash refers to the sha256 hash of the header of a block, but
sha256 takes in bytes, so we need a consistent way to convert objects into bytes. 


## Streamable Format
The streamable format is designed to be deterministic and easy to implement, to prevent consensus issues.
All objects in the Chia protocol and transmitted over the wire using the streamable format. Furthermore, some database
tables use streamable representation as well.

The primitives are:
* Sized ints serialized in big endian format, i.e uint64
* Sized bytes serialized in big endian format, i.e bytes32
* BLS public keys serialized in bls format (48 bytes)
* BLS signatures serialized in bls format (96 bytes)
* bool serialized into 1 byte (0x01 or 0x00)
* bytes serialized as a 4 byte size prefix and then the bytes.
* ConditionOpcode is serialized as a 1 byte value.
* str serialized as a 4 byte size prefix and then the utf-8 representation in bytes.

An item is one of:
* streamable
* primitive
* List[item1, .. itemx]
* Optional[item]
* Tuple[item1, .. itemx]
* Custom item


A streamable is an ordered group of items.

1. A streamable with fields 1..n is serialized by appending the serialization of each field.
2. A List is serialized into a 4 byte size prefix (number of items) and the serialization of each item.
3. An Optional is serialized into a 1 byte prefix of 0x00 or 0x01, and if it's one, it's followed by the serialization of the item.
4. A tuple of x items is serialized by appending the serialization of each item.
6. A Custom item is serialized by calling the .parse method, passing in the stream of bytes into it. And example is a CLVM program.

This format can be implemented very easily, and allows us to hash objects like headers and proofs of space,
without complex serialization logic.

## Examples

The streamable specification has been designed to work well with python using the @streamable decorator available in
`chia-blockchain`, but it can work just as well with other programming languages. A class with the @streamable
decorator becomes immutable, and has the `__bytes__()` and `.from_bytes(b)` methods.

```python
@streamable
class ProofOfSpace(Streamable):
    challenge: bytes32
    pool_public_key: Optional[G1Element]
    pool_contract_puzzle_hash: Optional[bytes32]
    plot_public_key: G1Element
    size: uint8
    proof: bytes
```

