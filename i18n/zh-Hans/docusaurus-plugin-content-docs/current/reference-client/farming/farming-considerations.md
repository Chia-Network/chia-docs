---
title: Farming Considerations
slug: /reference-client/farming/farming-considerations
---

# 耕种硬件考虑事项

在Chia中，奖励随存储空间的大小而增加(因此称为“Proof of Space”)。 存储是一种商品，并且与其他计算设备相比，功耗相对较低。 一般来说，Chia农民预计会将大部分投资花在硬盘上(通常为80-90%)，其余用于运营开支。 效率较低的农场可能会将50-80%的成本花在硬盘上，其余用于运营支出(OpEx)，例如电力和冷却费用。 我们可以逆向思考，并考虑建立Chia农场的目标。

1. 最大化在给定占地面积中可以容纳的存储容量。 在数据中心中，这通常被称为每个机架单元的TB。 This can be achieved by having dense storage systems (e.g. JBOD, NAS) and using high-capacity hard disk drives (HDD)
   Spend as little as possible. 每TB附加的$或每个驱动器附加的$，因为系统成本是按照农民可以连接的驱动器数量来摊销的，驱动器数量越多，每个驱动器的成本越低。
2. 最小化功耗。 我们希望Chia尽可能地节能，因此我们希望支持耕种平台尽量减少农民的功耗开销。 在构建良好的Chia农场中，硬盘消耗了大部分电能。
3. 电源效率。 我们希望我们消耗的电能被硬盘和农民使用，而不是浪费在电源供应效率或过多的冷却(风扇)中。
4. 最小化噪音(以分贝为单位)。 如果您将农民放在家里，您需要它相对安静。 如果您将农民放在合作基础设施、数据中心或远程位置，噪音就不是问题。 噪音与冷却(风扇速度)和功耗通常是相互权衡的。
5. 保持硬盘的冷却。 当HDD保持在建议的温度工作范围内时，其寿命(故障率)更长。 这在消费级和数据中心级HDD之间有所不同。 为了实现这一点，需要在耕种机箱中提供足够的气流和风扇，并通过SMART监控硬盘。
6. 可靠性和可用性(运行时间)。 我们不希望耕种系统崩溃。 我们不希望农民上的任何单个故障组件导致整个系统崩溃。 We do not want farming downtime (this is lost time and XCH farming)
   Host connectivity. 一般来说，耕种将通过网络(NAS、网络附加存储)远程连接，或者直接连接到农民(DAS、直接附加存储)。 没有一种正确的方式来连接许多驱动器，但通常DAS会是Chia耕种的最低成本和复杂性选项。
7. Redundancy & RAID. 大多数存储系统设计时考虑到持久性存储，并且包含RAID、纠删码、镜像或备份等冗余功能。 这在Chia中并非必需，因为在设备故障时可以重新创建Plot，并且使用冗余存储与其在Chia中耕作所获得的空间相比，通常会超过创建Plot的能源和时间成本。 对于拥有有限生成地块能力的小规模农民可能不是这种情况，但绝大多数用户不需要在Chia中使用任何形式的RAID。
8. Nice to haves (these are standard in JBODs that make life much, much easier)
   Hot-swap, field-replaceable drives: the ability to swap a hard drive without taking the system offline (turning it off), generally accessible through the front or top of the chassis
   staggered spin-up: hard drives consume much more power (25W) for the first 10 seconds or so that they are turned on, from something called in-rush current. 相比之下，耕种中每个硬盘需要3.5-5W的待机功耗。 Staggered spin-up spins up only a certain number of drives at a time to limit max power consumption
   slot identification: hard drives fail. 当这种情况发生时，您希望能够轻松地识别包含故障硬盘的插槽。 这通过LED指示完成。
