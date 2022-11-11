---
title: Serialization Protocol
slug: /serialization-protocol
---

Serialization in Chia refers to how objects are converted into bytes for uses such as transmitting to other nodes, storing on disk, or hashing objects.

For example, a header_hash refers to the sha256 hash of the header of a block, but
sha256 takes in bytes, so we need a consistent way to convert objects into bytes.

## Streamable Format

To prevent consensus issues, the streamable format was designed to be deterministic and easy to implement. All objects in the Chia protocol are transmitted using the streamable format. Furthermore, some database tables use streamable representation as well.

The primitives are:

- Sized ints serialized in big endian format, i.e uint64
- Sized bytes serialized in big endian format, i.e bytes32
- BLS public keys serialized in bls format (48 bytes)
- BLS signatures serialized in bls format (96 bytes)
- bool serialized into 1 byte (0x01 or 0x00)
- bytes serialized as a 4 byte size prefix and then the bytes.
- ConditionOpcode is serialized as a 1 byte value.
- str serialized as a 4 byte size prefix and then the utf-8 representation in bytes.

An item is one of:

- primitive
- Tuple[item1, .. itemx]
- List[item1, .. itemx]
- Optional[item]
- Custom item

A streamable must be a Tuple at the root level. Iters are serialized in the following way:

1. A tuple of x items is serialized by appending the serialization of each item.
2. A List is serialized into a 4-byte prefix (number of items) in big endian followed by the serialization of each item.
3. An Optional is serialized into a 1-byte prefix of 0x00 or 0x01, and if it's one, it's followed by the serialization of the item.
4. A Custom item is serialized by calling the .parse method, passing in the stream of bytes into it. An example is a CLVM program, which has its own serialization format.

This format can be implemented very easily, and allows us to hash objects like headers and proofs of space, without complex serialization logic.

Note that in the python implementation, we don't use a Tuple at the root level, but instead just use a dataclass with ordered type fields for ease of use. However, it is streamed as a Tuple.

## Examples

The streamable specification has been designed to work well with Python using the @streamable decorator available in `chia-blockchain`, but it can work just as well with other programming languages. A class with the @streamable decorator becomes immutable, and has the `__bytes__()` and `.from_bytes(b)` methods.

### ProofOfSpace type definition

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

### Creating and serializing a proof of space

```python
from chia.types.blockchain_format.proof_of_space import ProofOfSpace
from blspy import G1Element
from chia.types.sized_bytes import bytes32
from chia.util.ints import uint8, uint32
pospace = ProofOfSpace(bytes([0xaa]*32), None, bytes32([0xbb]*32), G1Element.generator(), uint8(33), bytes([0xcc]*264))
print(bytes(pospace))
```

### Output

As you can see, each one of the fields is serialized in order, according to the above specification. The G1 Generator value
is serialized in BLS format as: `<G1Element 97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb>`.

```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0001bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb2100000108cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
```
