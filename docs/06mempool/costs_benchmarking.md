---
sidebar_position: 2
---

# 6.2 CLVM costs

There are 3 main categories of resources that ascribe cost in Chia transaction blocks:

1. The size of generator program (each byte has cost)
2. The computation and memory use of the chialisp program, including validating aggregate signatures (each executed operator has a cost, and each AGGSIG condition has a cost)
3. The coins created by the block (each new coin has a cost)

Each of those categories is ascribed an equal amount of max cost. The cost is determined by an archetype block with 1000 vanilla transactions (2000 inputs and 2000 outputs). The cost for (2) is established by the clvm cost of running the generator program and the 2000 public key validations + aggregate signature validations.

This document will detail how the cost of various operators in CLVM was derived, as well as give some benchmarking. For a comprehensive list of CLVM operators, along with their associated costs, see the [CLVM Reference](https://chialisp.com/docs/ref/clvm#costs "Comprehensive list of costs of CLVM operators") on chialisp.com.

## Cost of CLVM program + signature validation

The costs of individual CLVM operators were established by benchmarking on one reference platform (Intel MacBookPro, see [benchmarks](#benchmarks) section). The benchmarking is described in our [clvm_tools repository](https://github.com/Chia-Network/clvm_tools/tree/develop/costs).


Those costs establish a baseline based on CPU usage. The costs were then hand-tweaked for various reasons:

* To ascribe additional cost to operations that allocate memory. I.e. the operand per-byte cost was inflated. This additional cost is called `MALLOC_PER_BYTE_COST`.
* The especially CPU intensive BLS operations (`point_add` and `pubkey_for_exp`) had their cost inflated to not differ too much from the lowest common denominator (The Raspberry PI)
* Some operations that do not allocate memory and end up being common in relatively simple programs had their cost deflated. Specifically, `if`, `cons`, `listp`, `first`, `rest`

```bash
$ brun -c --quiet -x ~/gen-compressed-cse2000.clvm.hex
cost = 1317054957
```

## Cost of signature validation

The time for the 2000 public key validations is 0.179370 ms and the time to validate the aggregate signature 0.972140 ms (per key). The total
cost (in ms) for the BLS operations ends up being:
 
(0.179370 + 0.972140) * 2000 = 2303.02 ms

The cost is approximately in units of nanoseconds, this means the cost for the BLS operations are 2303030000.

## Max block cost

This makes the max cost for (2) 1317054957 + 2303030000 = 3620084957. This is also the cost ascribed to (1) and (3).

The max cost for the whole block is: 3620084957 * 3 = 10860254871.

The cost for one `AGG_SIG_UNSAFE` and `AGG_SIG_ME` condition is 2303030000 / 2000 = 1151515.


The cost for creating 2000 coins is 3620084957, which makes the cost for one
`CREATE_COIN` 3620084957 / 2000 = 1810042.4785. We round that down to 1810042.

The size of the generator program with 2000 (compressed) transactions is 298249
Bytes. With a total max cost for the generator program size of 3620084957, this
means each byte has a cost of 3620084957 / 298249 = 12137.794. We round that
down to 12137 per byte.

These changes are made in the following PRs:

* [https://github.com/Chia-Network/chia-blockchain/pull/1864](https://github.com/Chia-Network/chia-blockchain/pull/1864)
* [https://github.com/Chia-Network/clvm_rs/pull/67](https://github.com/Chia-Network/clvm_rs/pull/67)
* [https://github.com/Chia-Network/clvm_tools/pull/55](https://github.com/Chia-Network/clvm_tools/pull/55)
* [https://github.com/Chia-Network/clvm/pull/82](https://github.com/Chia-Network/clvm/pull/82)

## Keeping up with the chain in real-time

With these parameters, we want a Raspberry PI 4 (as the lowest common denominator) to be powerful enough to stay in sync with the chain.
The target is:
* 1000 vanilla transactions per block (with 2 inputs each)
* a block is generated approximately [every 52 seconds](/docs/03consensus/foliage#transaction-block-time)

Running the generator program on Raspberry PI takes about 5.2 seconds.

```bash
$ brun --time -x --quiet ~/gen-compressed-cse2000.clvm.hex 
read_hex: 0.001582
run_program: 5.200286
```

From the RPi benchmarks below, running the G1 subgroup check on 2000 public keys takes about 2.2 seconds.
Validating the aggregate signature for 2000 public keys takes about 10.63 seconds.

That’s a total of 5.2 + 2.2 + 10.63 = 18.03 seconds per full block.

This is an upper end of the time to validate a block, a chain that only contains such full blocks would have 50 - 18.03 = 31.97 seconds head room.

Syncing on a RPi, given 4 cores validating blocks in parallel, would validate one block every 18.03 / 4 = 4.5 seconds, or 11 times the real-time rate.

## Benchmarks

Each public key used in an aggregate signature validation itself needs to be validated, to ensure
it is within the G1 subgroup. This cost is called "Public key validation" in the benchmarks.

The validation of an aggregate signature takes all the public keys and the signature. The time it takes per public key is measured by the benchmark.

For an `AGG_SIG_UNSAFE` and `AGG_SIG_ME` condition, we have to pay the cost for both the public key validation as well as the batch signature validation.

## Intel MacBook Pro (MacOS):

Public key validation<br/>
Avg: 0.179370

Batch verification<br/>
Avg: 0.979534

Public key validation<br/>
Avg: 0.177576

Batch verification<br/>
Avg: 0.972140

Benchmark           | Mean                    | Run 1    | Run 2    | Run 3    | Run 4    | Run 5    |
:-------------------|:------------------------|----------|----------|----------|----------|----------|---------:
concat.hex          | 0.501262 (+/- 0.064422) | 0.565684 | 0.513303 | 0.496998 | 0.464967 | 0.465357 |  26120605
count-even.hex      | 0.026014 (+/- 0.001493) | 0.027507 | 0.025044 | 0.027130 | 0.025091 | 0.025297 |    870038
factorial.hex       | 0.131095 (+/- 0.005716) | 0.136244 | 0.132469 | 0.125379 | 0.131392 | 0.129989 |   4886327
hash-string.hex     | 0.032044 (+/- 0.003577) | 0.028467 | 0.033647 | 0.032623 | 0.031431 | 0.034051 |         8
hash-tree.hex       | 0.046509 (+/- 0.018595) | 0.065104 | 0.043303 | 0.046810 | 0.038872 | 0.038454 |   2441153
large-block.hex     | 0.172984 (+/- 0.010322) | 0.183306 | 0.169465 | 0.171358 | 0.165167 | 0.175623 |  11771045
matrix-multiply.hex | 0.306149 (+/- 0.012838) | 0.318987 | 0.310576 | 0.306834 | 0.298227 | 0.296123 |  12639030
point-pow.hex       | 1.201742 (+/- 0.043949) | 1.218330 | 1.245691 | 1.186655 | 1.183430 | 1.174603 |  36833573
pubkey-tree.hex     | 0.447859 (+/- 0.020982) | 0.456490 | 0.452032 | 0.468841 | 0.428299 | 0.433631 |  13958834
shift-left.hex      | 2.165017 (+/- 0.159366) | 2.121753 | 2.266702 | 2.324383 | 2.050598 | 2.061647 | 127516332
substr-tree.hex     | 0.271265 (+/- 0.009849) | 0.276554 | 0.268063 | 0.281114 | 0.265876 | 0.264718 |   7951842
substr.hex          | 0.011117 (+/- 0.000833) | 0.011922 | 0.011290 | 0.010895 | 0.011195 | 0.010284 |   3730017
sum-tree.hex        | 0.458673 (+/- 0.017911) | 0.476584 | 0.456561 | 0.456589 | 0.460219 | 0.443414 |  19398358

TOTAL: 28.858642 s<br/>
UNCERTAINTY: 0.369854 s


## Rasberry PI 4 (Ubuntu):

Public key validation<br/>
Total: 10000 runs in 10861.6 ms<br/>
Avg: 1.086158

Signature validation<br/>
Total: 10000 runs in 13504.3 ms<br/>
Avg: 1.350434

Aggregation<br/>
Total: 10000 runs in 148.9 ms<br/>
Avg: 0.014888

Batch verification<br/>
Total: 10000 runs in 53152.0 ms<br/>
Avg: 5.315198

Benchmark           | Mean                    | Run 1    | Run 2    | Run 3    | Run 4    | Run 5    |
:-------------------|:------------------------|----------|----------|----------|----------|----------|----------:
concat.hex          | 2.428749 (+/- 0.012050) | 2.440799 | 2.421875 | 2.428564 | 2.424329 | 2.428178 | 1257994074
count-even.hex      | 0.076727 (+/- 0.001213) | 0.077940 | 0.076285 | 0.076888 | 0.075613 | 0.076911 |   78504156
factorial.hex       | 0.639212 (+/- 0.001122) | 0.640334 | 0.638237 | 0.640058 | 0.639238 | 0.638193 |  465263483
hash-string.hex     | 0.126674 (+/- 0.001705) | 0.126839 | 0.126396 | 0.125597 | 0.128379 | 0.126159 |        403
hash-tree.hex       | 0.226856 (+/- 0.032922) | 0.259778 | 0.217782 | 0.220257 | 0.216113 | 0.220352 |  192607523
large-block.hex     | 1.122793 (+/- 0.005169) | 1.125482 | 1.118527 | 1.127962 | 1.120893 | 1.121101 |  912025330
matrix-multiply.hex | 1.054925 (+/- 0.005195) | 1.051619 | 1.050996 | 1.058397 | 1.060120 | 1.053493 | 1225347499
point-pow.hex       | 7.679960 (+/- 0.008847) | 7.673864 | 7.688807 | 7.679499 | 7.685172 | 7.672456 | 1170703243
pubkey-tree.hex     | 2.833543 (+/- 0.010823) | 2.827021 | 2.827462 | 2.827365 | 2.841503 | 2.844366 |  433115124
shift-left.hex      | 9.265477 (+/- 0.055136) | 9.258471 | 9.224710 | 9.283895 | 9.239695 | 9.320613 | 6121839342
substr-tree.hex     | 0.922144 (+/- 0.042190) | 0.879954 | 0.938145 | 0.924528 | 0.930041 | 0.938053 |  681676071
substr.hex          | 0.041080 (+/- 0.000770) | 0.041850 | 0.041303 | 0.041275 | 0.040592 | 0.040382 |  458152257
sum-tree.hex        | 1.944325 (+/- 0.023737) | 1.964271 | 1.920588 | 1.935381 | 1.947506 | 1.953881 | 1634025407

TOTAL: 141.812333 s<br/>
UNCERTAINTY: 0.200879 s

| Category                       | Info           |
:--------------------------------|:----------------
Architecture                     | aarch64
CPU op-mode(s)                   | 32-bit, 64-bit
Byte Order                       | Little Endian
CPU(s)                           | 4
On-line CPU(s) list              | 0-3
Thread(s) per core               | 1
Core(s) per socket               | 4
Socket(s)                        | 1
Vendor ID                        | ARM
Model                            | 3
Model name                       | Cortex-A72
Stepping                         | r0p3
CPU max MHz                      | 1500.0000
CPU min MHz                      | 600.0000
BogoMIPS                         | 108.00
Vulnerability Itlb multihit      | Not affected
Vulnerability L1tf               | Not affected
Vulnerability Mds                | Not affected
Vulnerability Meltdown           | Not affected
Vulnerability Spec store bypass  | Vulnerable
Vulnerability Spectre v1         | Mitigation; __user pointer sanitization
Vulnerability Spectre v2         | Vulnerable
Vulnerability Srbds              | Not affected
Vulnerability Tsx async abort    | Not affected
Flags                            | fp asimd evtstrm crc32 cpuid

## MacBook Pro M1 (MacOS):

Public key validation<br/>
Total: 100000 runs in 14171.9 ms<br/>
Avg: 0.141719

Signature validation<br/>
Total: 100000 runs in 18376.9 ms<br/>
Avg: 0.183769

Aggregation<br/>
Total: 100000 runs in 198.1 ms<br/>
Avg: 0.001981
   
Batch verification<br/>
Total: 100000 runs in 75181.1 ms<br/>
Avg: 0.751811

Benchmark           | Mean                    | Run 1    | Run 2    | Run 3    | Run 4    | Run 5    |
:-------------------|:------------------------|----------|----------|----------|----------|----------|----------:
concat.hex          | 0.319137 (+/- 0.004308) | 0.318706 | 0.315356 | 0.317513 | 0.320665 | 0.323445 | 1257994074
count-even.hex      | 0.016693 (+/- 0.000945) | 0.016411 | 0.016587 | 0.016406 | 0.017638 | 0.016422 |   78564480
factorial.hex       | 0.110307 (+/- 0.003698) | 0.109790 | 0.114005 | 0.106660 | 0.112530 | 0.108550 |  465263483
hash-string.hex     | 0.013858 (+/- 0.004192) | 0.010237 | 0.018050 | 0.013132 | 0.016063 | 0.011808 |        403
hash-tree.hex       | 0.034891 (+/- 0.000910) | 0.033981 | 0.035471 | 0.035084 | 0.034515 | 0.035405 |  192607627
large-block.hex     | 0.142387 (+/- 0.001591) | 0.142081 | 0.142612 | 0.143400 | 0.140796 | 0.143046 |  912025330
matrix-multiply.hex | 0.212519 (+/- 0.008935) | 0.207990 | 0.211660 | 0.211059 | 0.210430 | 0.221454 | 1225364857
point-pow.hex       | 0.988268 (+/- 0.000552) | 0.988414 | 0.988038 | 0.987774 | 0.988820 | 0.988294 | 3732448507
pubkey-tree.hex     | 0.365297 (+/- 0.002148) | 0.364733 | 0.364677 | 0.364840 | 0.367445 | 0.364788 | 1361541189
shift-left.hex      | 1.399658 (+/- 0.176554) | 1.576212 | 1.436827 | 1.326422 | 1.326360 | 1.332471 | 6121839342
substr-tree.hex     | 0.184894 (+/- 0.002390) | 0.185809 | 0.184565 | 0.182504 | 0.187236 | 0.184355 |  682174111
substr.hex          | 0.007767 (+/- 0.000150) | 0.007741 | 0.007617 | 0.007828 | 0.007763 | 0.007884 |  458152257
sum-tree.hex        | 0.334523 (+/- 0.003467) | 0.337452 | 0.334353 | 0.333219 | 0.331056 | 0.336535 | 1634025209

TOTAL: 20.650990 s<br/>
UNCERTAINTY: 0.209840 s

## AMD Threadripper (Ubuntu):

Public key validation<br/>
Total: 100000 runs in 23228.6 ms<br/>
Avg: 0.232286

Signature validation<br/>
Total: 100000 runs in 29922.9 ms<br/>
Avg: 0.299229

Aggregation<br/>
Total: 100000 runs in 332.8 ms<br/>
Avg: 0.003328

Batch verification<br/>
Total: 100000 runs in 118448.7 ms<br/>
Avg: 1.184487

Benchmark           | Mean                    | Run 1    | Run 2    | Run 3    | Run 4    | Run 5    |
:-------------------|:------------------------|----------|----------|----------|----------|----------|----------:
concat.hex          | 0.581093 (+/- 0.005692) | 0.575522 | 0.575830 | 0.584434 | 0.586785 | 0.582893 |  26120605
count-even.hex      | 0.020654 (+/- 0.000485) | 0.020973 | 0.020169 | 0.020486 | 0.020777 | 0.020864 |    870038
factorial.hex       | 0.169776 (+/- 0.003897) | 0.166334 | 0.169560 | 0.168041 | 0.173673 | 0.171273 |   4886327
hash-string.hex     | 0.030154 (+/- 0.001226) | 0.028928 | 0.030092 | 0.030204 | 0.030228 | 0.031319 |         8
hash-tree.hex       | 0.061338 (+/- 0.004685) | 0.066023 | 0.059427 | 0.060302 | 0.061496 | 0.059441 |   2441154
large-block.hex     | 0.247669 (+/- 0.002541) | 0.249690 | 0.246468 | 0.245128 | 0.246901 | 0.250160 |  11771045
matrix-multiply.hex | 0.266182 (+/- 0.007053) | 0.263277 | 0.264556 | 0.260580 | 0.273235 | 0.269262 |  12639201
point-pow.hex       | 1.277133 (+/- 0.009800) | 1.274667 | 1.277491 | 1.267333 | 1.284849 | 1.281324 |  36833573
pubkey-tree.hex     | 0.467744 (+/- 0.005799) | 0.465715 | 0.468408 | 0.464635 | 0.466420 | 0.473543 |  13958834
shift-left.hex      | 2.257188 (+/- 0.033191) | 2.229812 | 2.290379 | 2.232093 | 2.278260 | 2.255394 | 127516332
substr-tree.hex     | 0.239506 (+/- 0.005986) | 0.238335 | 0.238491 | 0.236606 | 0.238605 | 0.245492 |   7951842
substr.hex          | 0.010767 (+/- 0.000227) | 0.010833 | 0.010612 | 0.010576 | 0.010994 | 0.010822 |   3730017
sum-tree.hex        | 0.497707 (+/- 0.004666) | 0.497410 | 0.496120 | 0.497402 | 0.495228 | 0.502373 |  19398368

TOTAL: 30.634553 s<br/>
UNCERTAINTY: 0.085249 s

| Category                      | Info           |
:-------------------------------|:----------------
Architecture                    | x86_64
CPU op-mode(s)                  | 32-bit, 64-bit
Byte Order                      | Little Endian
Address sizes                   | 43 bits physical, 48 bits virtual
CPU(s)                          | 32
On-line CPU(s) list             | 0-31
Thread(s) per core              | 2
Core(s) per socket              | 16
Socket(s)                       | 1
NUMA node(s)                    | 2
Vendor ID                       | AuthenticAMD
CPU family                      | 23
Model                           | 1
Model name                      | AMD Ryzen Threadripper 1950X 16-Core Processor
Stepping                        | 1
Frequency boost                 | enabled
CPU MHz                         | 1890.214
CPU max MHz                     | 3400,0000
CPU min MHz                     | 2200,0000
BogoMIPS                        | 6786.36
Virtualisation                  | AMD-V
L1d cache                       | 512 KiB
L1i cache                       | 1 MiB
L2 cache                        | 8 MiB
L3 cache                        | 32 MiB
NUMA node0 CPU(s)               | 0-7,16-23
NUMA node1 CPU(s)               | 8-15,24-31
Vulnerability Itlb multihit     | Not affected
Vulnerability L1tf              | Not affected
Vulnerability Mds               | Not affected
Vulnerability Meltdown          | Not affected
Vulnerability Spec store bypass | Mitigation; Speculative Store Bypass disabled via prctl and seccomp
Vulnerability Spectre v1        | Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2        | Mitigation; Full AMD retpoline, STIBP disabled, RSB filling
Vulnerability Srbds             | Not affected
Vulnerability Tsx async abort   | Not affected
Flags                           | fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm constant_tsc rep_good nopl nonstop_tsc cpuid extd_apicid am d_dcm aperfmperf pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpb hw_pstate sme ssbd sev vmmcall fsgsbase bmi1 avx2 smep bmi2 rdseed adx smap clflushopt sha_ni xsaveopt xsavec xgetbv1 xsaves clzero irperf xsave erptr arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif overflow_recov succor smca


