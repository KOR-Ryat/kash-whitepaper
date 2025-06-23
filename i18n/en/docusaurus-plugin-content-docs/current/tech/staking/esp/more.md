---
id: more
sidebar_position: 3
---

# Advanced Guide

In addition to the core concepts of EPB/DCR and Virtual Shares, the Early Staking Pool has several other features.

---

### Guaranteed Minimum Reward

+ The issuance of weighted shares in the staking pool is limited: 30 million for the Early Staking Pool.
+ The total amount of rewards allocated to the staking pool is fixed: 30 million for the Early Staking Pool.

→ This means that 1 weighted share is guaranteed to receive a minimum reward of at least 1 KASH.

+ The share price during the sale is fixed: 1 KASH per Share for the Early Staking Pool.

→ Consequently, one DCR potentially guarantees a future profit of 1 KASH.

+ The total number of tokens to be issued through the initial sale is fixed: 5 million for the Early Sales.
+ The total amount of DCR to be issued through the initial sale is fixed: 25 million for the Early Sales.

→ This allows all tokens sold and all DCR issued during the initial sale to be staked in the pool.

Therefore, initial sales participants can be guaranteed a rate of return corresponding to their EPB multiplier.

For users who participate after one or more Epochs have passed, some of the 1 KASH interest receivable per weighted share has already been paid out. Thus, a weighted share no longer guarantees an additional 1 KASH in interest. Nevertheless, a minimum return can still be calculated and guaranteed based on the remaining rewards at the time of participation.

:::note
This refers to the increase in the quantity of KASH tokens as "profit" and provides a mathematical guarantee for that increase. This is based on the assumption of participating until the end of the reward distribution period, especially for initial sales participants who stake all their tokens and DCR immediately after purchase.
:::

---

### Principal Conversion Right

Once the pool is more than halfway through its duration ($Epoch_{Current} \ge \frac{N_{epochs}}{2}$), users can exercise a "Principal Conversion Right" (PCR) to withdraw their principal without burning their shares.

+ When participating in the sale, the relevant information (KASH purchased, asset paid, payment amount) is recorded.
+ PCR can be exercised once the pool has passed its halfway point.
+ Exercising this right allows the withdrawal of a value equivalent to the KASH purchased in the sale.
+ The user's reduced principal shares are replaced with an equal number of virtual shares by issuing corresponding debt.
+ The withdrawn KASH is burned, and the user receives back the original asset they paid with.
+ As a result, the user can recover their principal while continuing to receive staking interest.

It is possible to temporarily exceed the maximum leverage when recovering the principal through Principal Conversion. However, after the leverage has increased through this process, any subsequent exercise of DCR must not exceed the maximum leverage condition.

:::note
PCR cannot be exercised partially; it can only be exercised for the entire principal. Therefore, if any withdrawal (burning of shares) has occurred prior to exercising, PCR cannot be used. This policy is due to the inherent ambiguity of the concept of "principal" in a compounding system and the excessive complexity involved in tracking it.
:::

---

### Staking Reservation

The token deposit limit for the Early Staking Pool is based on weighted shares. This limit is designed to exactly match the initial sales volume and the corresponding DCR issued. Therefore, while all initial sales participants can stake their full amount, other participants can only join if and when a spot becomes available due to someone else leaving.

The protocol supports a reservation system to automatically participate in staking when a spot opens up. To make a reservation, users must pre-deposit the desired amount of KASH into a reservation pool.

At the end of each Epoch, just before rewards are calculated, a Keeper processes the staking reservations in a first-in, first-out (FIFO) order. This is done only within the deposit limit of the staking pool, and in some cases, only a partial amount of the desired sum may be fulfilled. In such cases, the remaining amount is kept as a reservation with the highest priority.

A user can cancel their reservation and retrieve their KASH at any time before it is fulfilled. However, if they wish to make a reservation again later, they will have to wait at the back of the queue. The same applies to partial withdrawals; the queue position is maintained for the remaining reserved amount, but the withdrawn KASH cannot be added back to the existing reservation at the same priority.

If a reservation exists in the staking reservation pool, direct staking is not possible. If the share limit is greater than the reserved amount and a user wishes to stake immediately, they can trigger a transaction to execute the reservation fulfillment function themselves.