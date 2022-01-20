---
sidebar_position: 1
---
# 8.1 序列化

> Serialization

Chia 中的序列化是指如何将对象转换为字节以供传输到其他节点、存储在磁盘上或散列对象等用途。

例如，header_hash 指的是块头的 sha256 哈希，但是 sha256 以字节为单位，因此我们需要一种一致的方式将对象转换为字节。

<details>
<summary>原文参考</summary>

Serialization in Chia refers to how objects are converted into bytes for uses such as transmitting to other nodes, storing on disk, or hashing objects.

For example, a header_hash refers to the sha256 hash of the header of a block, but sha256 takes in bytes, so we need a consistent way to convert objects into bytes. 

</details>

## 可流格式

为防止出现共识问题，可流式传输格式被设计为具有确定性且易于实施。 Chia 协议中的所有对象都使用可流格式传输。 此外，一些数据库表也使用流式表示。

原语是：

*   以大端格式序列化的大小整数，即 uint64
*   以大端格式序列化的大小字节，即 bytes32
*   以 bls 格式序列化的 BLS 公钥（48 字节）
*   以 bls 格式序列化的 BLS 签名（96 字节）
*   bool 序列化为 1 个字节（0x01 或 0x00）
*   字节序列化为 4​​ 字节大小的前缀，然后是字节。
*   ConditionOpcode 被序列化为 1 字节值。
*   str 序列化为 4​​ 字节大小的前缀，然后以字节为单位的 utf-8 表示。

一个项目是以下之一：

*   原始
*   元组 \[item1, .. itemx\]
*   列表 \[item1, .. itemx\]
*   可选 \[项目\]
*   定制项目

流媒体必须是根级别的元组。Iters按以下方式序列化：

1. 通过附加每个项目的序列化来序列化 x 个项目的元组。
2. 一个 List 被序列化为一个 4 字节的前缀（项目数）和每个项目的序列化。
3. 一个 Optional 被序列化为 0x00 或 0x01 的 1 字节前缀，如果是 1，则后面是 item 的序列化。
4. 自定义项通过调用 .parse 方法进行序列化，将字节流传入其中。示例是 CLVM 程序。

这种格式可以很容易地实现，并允许我们散列对象，如标题和空间证明，而无需复杂的序列化逻辑。

请注意，在 python 实现中，我们不在根级别使用元组，而是仅使用带有有序类型字段的数据类以方便使用。 但是，它作为元组流式传输。

<details>
<summary>原文参考</summary>

- ## Streamable Format

To prevent consensus issues, the streamable format was designed to be deterministic and easy to implement. All objects in the Chia protocol are transmitted using the streamable format. Furthermore, some database tables use streamable representation as well.

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
* primitive
* Tuple[item1, .. itemx]
* List[item1, .. itemx]
* Optional[item]
* Custom item

A streamable must be a Tuple at the root level. Iters are serialized in the following way:

1. A tuple of x items is serialized by appending the serialization of each item.
2. A List is serialized into a 4-byte prefix (number of items) and the serialization of each item.
3. An Optional is serialized into a 1 byte prefix of 0x00 or 0x01, and if it's one, it's followed by the serialization of the item.
4. A Custom item is serialized by calling the .parse method, passing in the stream of bytes into it. And example is a CLVM program.

This format can be implemented very easily, and allows us to hash objects like headers and proofs of space, without complex serialization logic.

Note that in the python implementation, we don't use a Tuple at the root level, but instead just use a dataclass with ordered type fields for ease of use. However, it is streamed as a Tuple.

</details>

## 例子

streamable 规范旨在使用 中提供的 @streamable 装饰器与 python 良好工作 `chia-blockchain` ，但它也可以与其他编程语言一起工作。 带有 @streamable 装饰器的类变得不可变，并且具有 `__bytes__()` 和 `.from_bytes(b)` 方法。

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

<details>
<summary>原文参考</summary>

- ## Examples

The streamable specification has been designed to work well with python using the @streamable decorator available in `chia-blockchain`, but it can work just as well with other programming languages. A class with the @streamable decorator becomes immutable, and has the `__bytes__()` and `.from_bytes(b)` methods.

- ### ProofOfSpace type definition

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


- ### Creating and serializing a proof of space

```python
from chia.types.blockchain_format.proof_of_space import ProofOfSpace
from blspy import G1Element
from chia.types.sized_bytes import bytes32
from chia.util.ints import uint8, uint32
pospace = ProofOfSpace(bytes([0xaa]*32), None, bytes32([0xbb]*32), G1Element.generator(), uint8(33), bytes([0xcc]*264))
print(bytes(pospace))
```

- ### Output

As you can see, each one of the fields is serialized in order, according to the above specification. The G1 Generator value
is serialized in BLS format as: `<G1Element 97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb>`.
```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0001bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb97f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb2100000108cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
```

</details>
