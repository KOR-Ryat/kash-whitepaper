---
id: core
sidebar_position: 1
---

# Core Principles

The KASH staking mechanism is designed based on the following core concepts.

---

### Staking Pool

In the KASH Phase 1 ecosystem, KASH allocated for staking rewards is pre-distributed to a Staking Reward Vault. This can be divided and distributed into separate staking pools over several phases according to the protocol's strategy.

+ Each staking pool can have its own settings for total rewards, reward period (epoch duration), deposit limits, and special systems.
+ Each pool is independent of the others, and the rewards for a pool are distributed only to users who have staked within that specific pool.
+ While there are generally no restrictions on choosing which pool to stake in, staking may be difficult in pools with limited deposit capacity.
+ Additionally, withdrawing from one pool to stake in another may result in the loss of existing status (such as EPB).

---

###  Epoch

KASH staking rewards are not accrued in real-time or continuously. Instead, they are distributed according to a predefined time period called an Epoch. At the end of each epoch, the total rewards generated during that epoch are calculated and allocated to staking participants.

+ **Genesis Timestamp**
    + Reward distribution does not begin immediately upon the creation of a staking pool. While users can stake in advance to secure a position or gain an early advantage in pools with limited capacity, the actual reward-distributing Epochs may start later.
    + $T_{open}$[^STAKING_POOL_OPEN]: The time when the staking pool opens and deposits become possible.
    + $T_{start}$[^STAKING_EPOCH_START]: The start time of the first Epoch when reward distribution for the staking pool begins ($T_{open} \le T_{start}$).

+ **Epoch Reward**
    + The amount of rewards distributed in each epoch is designed to increase gradually by applying a growth rate ($g$). This is intended to stabilize the early ecosystem and encourage long-term participation. 
    
    + $N_{epochs}$: The total number of epochs during the entire staking period of the pool.
        $$
        N_{epochs} = \frac{Duration_{pool}}{Duration_{epoch}}
        $$
        + $Duration_{pool}$[^STAKING_TOTAL_DURATION]: The total duration of the staking period for the pool.
        + $Duration_{epoch}$[^STAKING_EPOCH_DURATION]: The duration of each epoch in the pool.

    + $Reward_{base}$[^STAKING_REWARD_BASE]: The base reward amount to be distributed in the first epoch is determined from the pool's total rewards and the growth rate.
        $$
        Reward_{base} = 
        \begin{cases}
            (Reward_{Total} \times g) / ((1 + g)^{N_{epochs}} - 1) & (g \gt 0) \\
            Reward_{Total} / N_{epochs}  & (g = 0)
        \end{cases}
        $$
        + $Reward_{Total}$[^STAKING_REWARD_TOTAL]: The total amount of tokens allocated to the staking pool.
        + $g$[^STAKING_REWARD_GROWTH]: The per-epoch reward growth rate.

    + $Reward_{Epoch}$: The total reward to be distributed in the k-th epoch is as follows:
        $$
        Reward_{Epoch,k} = Reward_{base} \times (1 + g)^{k-1} \quad (1 \le k \le N_{epochs})
        $$

---

### Epoch Reward Graph

The following graph shows the reward amount and rate of return for each epoch when g=0.05, which is currently used in the Early Staking Pool.

![KASH Epoch Reward Graph](/img/kash_epoch_rewards.png)

+ Assumes a total of 36 epochs and total reward = 1.

---

### Staking Reward

The principle of proving a stake and receiving rewards is implemented through the concept of a "Share" of the total pool, similar to Uniswap's LP tokens.

+ **Share**: A share of the staking pool.
    $$
    Share_{earn} = Deposit / Price_{share}
    $$
    + $Deposit$: The number of KASH tokens to be deposited.
    + $Price_{share}$: The value of a single share at the time of entry. (KASH/share)
    + $Share_{earn}$: The number of shares received for the deposited amount.

+ **Share Price**: The current value represented by a single share. When entering or exiting, KASH is exchanged based on this price.
    $$
    Price_{share} = \frac{(\sum Principle_{\text{All users}} + \sum Reward_{\text{All epochs}})}{\sum Shares_{\text{All users}}}
    $$
    + $\sum Principle_{\text{All users}}$: The total principal amount staked by all users.
    + $\sum Reward_{\text{All epochs}}$: The total rewards realized in the staking pool.
    + $\sum Shares_{\text{All users}}$: The sum of all users' shares in the staking pool.

+ **Staking Reward**
    + Staking rewards are distributed evenly across all shares in the pool. As total rewards accumulate in the pool, this is reflected as an increase in the value of the shares.
    $$
    Reward_{share} = \frac{Reward_{Epoch,k}}{\sum Shares_{\text{All users}}} = Price_{share, new} - Price_{share, old}
    $$
    + Therefore, an individual user's reward is as follows:
    $$
        Reward_{user} = \frac{Reward_{Epoch,k}}{\sum Shares_{\text{All users}}} * Shares_{user}
    $$

---

The next section describes additional elements built upon this basic staking framework for early participants.

---

[^STAKING_POOL_OPEN]: Corresponds to the STAKING_POOL_OPEN [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^STAKING_EPOCH_START]: Corresponds to the STAKING_EPOCH_START [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^STAKING_TOTAL_DURATION]: Corresponds to the STAKING_TOTAL_DURATION [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^STAKING_EPOCH_DURATION]: Corresponds to the STAKING_EPOCH_DURATION [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^STAKING_REWARD_BASE]: Calculated and assigned at the time of pool creation based on the value of g. Corresponds to the STAKING_REWARD_BASE [parameter in the smart contract configuration](/tech/deployment/config-initial). 
[^STAKING_REWARD_TOTAL]: Corresponds to the STAKING_REWARD_TOTAL [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^STAKING_REWARD_GROWTH]: Corresponds to the STAKING_REWARD_GROWTH [parameter in the smart contract configuration](/tech/deployment/config-initial).