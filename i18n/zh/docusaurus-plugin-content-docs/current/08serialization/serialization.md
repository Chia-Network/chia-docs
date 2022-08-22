---
sidebar_position: 1
---

# 8.1 序列化

Serialization in Chia refers to how objects are converted into bytes for uses such as transmitting to other nodes, storing on disk, or hashing objects.

例如，哈希头指的是区块头的 sha256 哈希，但是 sha256 以字节为单位，因此我们需要一种一致的方式将对象转换为字节。

## 可流式传输格式

为防止出现共识问题，可流式传输格式被设计为具有确定性且易于实施。 奇亚协议中的所有对象都使用可流格式传输。 此外，一些数据库表也使用流式表示。

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
- Tuple[item1, .. itemx] itemx]
- List[item1, .. itemx] itemx]
- Optional[item]
- Custom item

可流式传输必须是根级别的元组。 迭代器按以下方式序列化：

1. A tuple of x items is serialized by appending the serialization of each item.
2. A List is serialized into a 4-byte prefix (number of items) and the serialization of each item.
3. An Optional is serialized into a 1 byte prefix of 0x00 or 0x01, and if it's one, it's followed by the serialization of the item.
4. 自定义项通过调用 .parse 方法进行序列化，将字节流传入其中。 示例是 CLVM 程序。

This format can be implemented very easily, and allows us to hash objects like headers and proofs of space, without complex serialization logic.

请注意，在 python 实现中，我们不在根级别使用元组，而是仅使用带有有序类型字段的数据类以方便使用。 但是，它作为元组流式传输。

## 例子

可流式传输规范旨在使用 中提供的 @streamable 装饰器与 python 良好工作 `奇亚区块链` ，但它也可以与其他编程语言一起工作。 带有 @streamable 装饰器的类变得不可变，并且具有 `__bytes__()` 和 `.from_bytes(b)` 方法。

### ProofOfSpace 类型定义

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

### 创建和序列化空间证明

```python
from chia.types.blockchain_format.proof_of_space import ProofOfSpace
from blspy import G1Element
from chia.types.sized_bytes import bytes32
from chia.util.ints import uint8, uint32
pospace = ProofOfSpace(bytes([0xaa]*32), None, bytes32([0xbb]*32), G1Element.generator(), uint8(33), bytes([0xcc]*264))
print(bytes(pospace))
```

### 输出

如您所见，根据上述规范，每个字段都按顺序序列化。 G1 Generator 值以 BLS 格式序列化为： `<G1Element 97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb>` 。

```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0001bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb2100000108cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
```
