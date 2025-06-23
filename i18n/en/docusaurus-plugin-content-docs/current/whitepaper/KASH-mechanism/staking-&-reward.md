---
id: staking-&-reward
title: 3. Initial Investor Rewards
description: KASH Staking and Rewards for Initial Risk
sidebar_position: 3
---

This document explains how KASH returns profits by providing rewards to users who participate (invest) and take on the risks of the early ecosystem.

---

### KASH Staking Core

+ **Summary**
    + Rewards are distributed like interest, monthly over a total of 3 years, exclusively to stakers.
    + Staking 1 KASH for 3 years will yield a total reward of over 1 KASH.
    + A bonus is provided based on the sales participation timing, offering a net profit of 4 to 25 times the initial investment.

:::note Example Scenario
1. Purchase 100 KASH with 100 USDT during the initial token sale.
2. Assume you secure a target profit multiplier (EPB) of 20x. This is determined by your participation timing in the sale.
3. When staking 100 KASH, a bonus deposit of 1900 KASH is considered added, based on your target profit multiplier.
4. A reward (interest) of approximately 2% on the total 2000 KASH is accrued monthly with compounding.
5. After 1 year and 6 months, you can withdraw your principal of 100 USDT while continuing to stake (PCR).
6. At the 3-year mark, you can withdraw the accumulated total interest of over 2000 KASH and end your staking.
7. As a result, a total profit of 2000 KASH is generated over 3 years, making your final assets 2000 KASH + the 100 USDT you withdrew.
8. If KASH maintains a value of at least \$1, this represents a return rate of over 2000%.
:::


+ KASH is a token issued in a fixed quantity corresponding to the future, specific profits that will be generated from mine development. A portion of this issuance (50%) is allocated for staking rewards.

+ You can stake KASH in a staking pool and periodically receive KASH as a reward. This concept is similar to depositing KRW in a bank and receiving KRW interest. Likewise, **this does not necessarily guarantee a profit when measured in other currencies like the US dollar.**

+ By limiting the total amount that all users can stake in a pool, the interest on staked assets is prevented from being infinitely diluted. Instead of offering a vague possibility of high returns, we can provide a concrete minimum return at the time of staking (or purchase).

+ For every 1 KASH staked, a total interest of 1 KASH is guaranteed over the full term. This translates to a **return of over +100% over 3 years**, which can be converted to an **APY of about 26%, or a compound interest rate of nearly 2% monthly**. However, **the monthly interest is not distributed evenly; rewards start low and gradually increase over time**.

+ Sales participants receive a **bonus deposit amount** (DCR) in proportion to their purchase timing (which determines their target profit multiplier, or EPB) and purchase amount. While this is not a directly withdrawable amount, when you stake, **this DCR is treated as if you had staked that much extra, allowing you to earn more interest**. It's a mechanism designed to help you **achieve a final return equivalent to your EPB**.

+ The target profit multiplier (EPB) for **initial sales** participants is set to range from 4x to a maximum of 25x of their investment, depending on sales progress. This means we aim to provide returns over 3 years so that, including the principal, **early participants can form a KASH quantity of up to 26x their initial amount**, while even **late participants can achieve over 5x**.

+ After **18 months**, when the project is halfway through, you can **recover your initial investment principal** without having to stop staking. You get back the asset you used to participate in the sale, and this withdrawn amount is **replaced by a bonus (DCR)**, allowing you to maintain the same stake size and continue receiving the **same interest as before the recovery** for the remaining period. This right is called **PCR**.

+ Even before that, you can **withdraw your entire principal and all accrued interest to date at any time** and exit staking. However, this decision should be made carefully as it means forfeiting future benefits, including sales privileges, as detailed below:
    + The bonus deposit amount is burned in proportion to the withdrawn amount.
    + Future rewards (interest) will decrease in proportion to the withdrawn amount.
    *   Withdrawing even a partial amount will forfeit your right to principal recovery (PCR).
    + As the staking pool's capacity is limited, re-staking may be difficult.


The rest of this document will explain these core concepts in more detail.

:::info
You can refer to the [EPB/DCR Graph Interpretation](./staking-&-reward#epb--dcr-graph-interpretation) section below for an estimated return graph based on participation timing. For a precise reward simulation, you can use the [Reward Calculator](https://kash-rwa.io/calculator).
:::

---

### Terminology

While this document aims to be understandable even for those unfamiliar with blockchain, DeFi, or financial investment, some terms are used for brevity. Here is a summary:

**1. DeFi & Blockchain Related**
*   **Token:** A unit representing a digital asset or right on a blockchain, similar to a coin. KASH is a type of token.
*   **Staking:** The act or system of locking up assets like tokens in a network to receive rewards, similar to interest.
*   **Staking Pool:** A place or system where multiple people participate in staking and share the rewards based on their stake.
*   **Token Sales:** The process where a project sells its tokens to raise initial funds or distribute them. It's similar to an IPO in the stock market.
*   **Protocol:** A set of rules or agreements that govern how a project works, or the ecosystem (system) itself.
*   **APY (Annual Percentage Yield):** The expected rate of return from staking an asset for one year. It is often used to refer to a rate that includes the effect of compounding, where interest (rewards) is automatically reinvested, distinguishing it from APR (Annual Percentage Rate).

**2. Investment & Finance Related**

*   **Risk:** The uncertainty that an investment could result in an outcome (loss) different from what was expected.
*   **Risk Premium:** An additional reward offered to investors who take on higher risk, allowing them to expect a higher return than a standard investment.
*   **Return Rate, Yield:** The ratio (%) of how much profit (return) you earned relative to the amount you invested.

**3. KASH-Defined Terms**

*   **EPB (Early Participant Bonus):** A 'target (net) profit multiplier' given to investors who participate in the KASH sale. It signifies the rate of return the protocol aims to guarantee for that participant. This is realized by granting a bonus deposit amount (DCR) equal to (EPB-1) times the purchase amount at the time of staking, and by distributing a total interest of at least 1 KASH per 1 KASH staked.
*   **DCR (Debt Creation Right):** The bonus deposit amount, or more accurately, the 'right to receive a bonus deposit amount.' While not a withdrawable sum, it is treated as part of your stake for interest calculation, allowing you to receive additional interest. The term "debt" is used to reflect its design principle, but in a structure where the principal and interest are guaranteed to always increase, it can be simply interpreted as a bonus or the right to earn more interest. For intuitive understanding, this document refers to it as the bonus deposit amount.
*   **PCR (Principal Conversion Right):** After 18 months, you can convert the KASH you purchased in the initial sale and staked into a bonus deposit amount. You can then withdraw the staked KASH and exchange it back for the asset you originally used in the sale. In other words, it is the right to recover the amount you invested in the sale while maintaining the same stake size (deposit amount) and continuing to receive the same planned interest for the remaining period. The exchanged KASH is burned from the vault, as the collateral corresponding to its (initial) value has been returned.

---

### Discussion in KASH Units (Important)

:::info
A user's final perceived return is influenced by many factors. A major one is the price volatility of KASH itself. This will be discussed in more detail in the previous document on the [KASH Value Structure](./kash-structure) and the next document on [Price Regulation (Stabilization)](./kash-liquidity).
:::

For now, to focus on the reward program and discuss more concrete and certain figures, we will conduct our **discussion in KASH units**, free from uncertain elements. This means the following terms should be interpreted as described below:
+ **"Profit"** here means **profit in KASH units, i.e., the increased quantity of KASH**.
+ **"Principal"** becomes the **initial quantity of KASH tokens a user purchased and staked**.
    + As an exception, for the principal that can be recovered via PCR after 18 months, it refers to the "principal used to purchase KASH," i.e., the principal in terms of assets like USDT.

:::caution
Users must be aware that other expressions in this document, such as "guaranteed" or "assured," are based on the premise that the **"value fluctuation" of KASH is not considered**. You should anticipate the following situations to avoid confusion:

+ If you exit the project early, **staking may return a KASH quantity greater than your principal**, but the value of that guaranteed KASH itself might have temporarily decreased. In this case, you could incur a **loss in fiat currency terms** after selling the KASH.
+ **Even if staking returns the promised KASH profit and the KASH value remains at or above its initial value in USD terms** (\$1/KASH), the exchange rate to your local currency might have dropped. In this case, your **return in your local currency terms could be lower than the expected rate**.
:::

---

### Respect for Early Investors

The team has prepared the following mechanisms to ensure that early participants, who take on risk and contribute significantly to the project's launch, can make the most rational investment possible.

:::note 1. **High Rate of Return** for Risk

We will return rewards equivalent to 5 times the total sales amount. In particular, the highly uncertain initial sale has 6 times the reward allocated relative to its sales volume, allowing **early participants to earn over 20x** their investment. Even **later participants**, who join after a significant degree of project stability is secured, will be offered a **return rate of over 52% APY** (assuming the lowest EPB of 1.5 for the additional sale).
:::

:::note 2. **Flexible Participation** with No Lock-up

Although we have adopted a reward distribution model through staking to stabilize the ecosystem, users have **no mandatory deposit period**. They can choose to unstake (burn shares) as much as they want at any time, receive their **entire principal and all accrued interest to date**, and exit staking. Of course, future staking rewards will decrease or cease depending on the withdrawal amount.
:::

:::note 3. **Principal Recovery** During the Project

Starting from the 18-month mark, when the project is halfway through, you can **recover your entire principal without exiting staking** (PCR). There are **no penalties** like share reduction or burning of the bonus deposit amount, and you can **continue to earn the same interest as before the recovery** for the remaining staking period. You can use this recovered capital elsewhere, or even purchase more KASH to earn more interest if you wish.
:::

---

### Phase 1 Limited Risk Reward

The vRWA used in KASH's Phase 1 are **future-value assets issued before physical gold production**, and KASH, being issued based on this structure, carries the risk of **value formation under incomplete collateralization**. To compensate investors who enter the ecosystem early and take on this risk, a **staking reward program** offering a **high APY** will be operated on a **limited basis for Phase 1**. In particular, users who participate earlier will be assigned a higher **target profit multiplier** (EPB) and receive greater rewards. 

50 million KASH (50% of the total supply) have been allocated for staking rewards. These will be entirely used for the rewards of the two staking pools below, and therefore, there are no plans for such high-value staking pools in the future.

| **Staking Pool** | **Start** | **Participation Limit** | **Total Rewards** | **Target** |
| --- | --- | --- | --- | --- |
| Early Staking Pool | After 1st Sale Completion | Initial 30m (Initial Sale 5m + DCR 25m, subject to change) | 30m | Initial Investors |
| Second Staking Pool | With 2nd Sale Start | Initial 20m (Additional Sale 5m + DCR 15m, subject to change) | 20m | Subsequent Investors |
| Total || Approx. 50m | **50m** | Phase 1 Participants |

:::tip
A total reward of 30m for a sales volume of 5m arithmetically means the **average** return for all participants is 6x. However, since early participants are given more rewards due to higher EPB and DCR, later participants will receive less than this. Therefore, care must be taken to interpret this by understanding additional details like the reward distribution method, EPB, and DCR. 
:::

---

### Reward Method and Its Source

The reward program for early participation is structured in the **form of staking**. When a user **stakes KASH**, they can **earn KASH as interest-like rewards every month**. The total amount of rewards to be distributed in a given month is predetermined, and this amount is shared among participants in proportion to their staked amount.

Sales participants receive a **bonus deposit amount (DCR) based on their individual target profit multiplier (EPB)**. This takes effect when calculating each person's share of the rewards, allowing them to **receive 'n' times more interest compared to their actual staked amount**.

:::note
If the total reward for this cycle is 100 KASH, and three users are staking, their rewards are distributed as follows:

| User | Staked Amount | EPB | Bonus Deposit from DCR | Total | Share % | Reward |
| --- | --- | --- | --- | --- | --- | --- |
| A | 500 KASH | 6x | +2500 KASH | 3000 KASH | 30% | +30 KASH |
| B | 1000 KASH | 1x | +0 KASH | 1000 KASH | 10% | +10 KASH |
| C | 1000 KASH | 6x | +5000 KASH | 6000 KASH | 60% | +60 KASH |
| Total | 2500 KASH | - | 7500 KASH | 10000 KASH | 100% | +100 KASH |
:::

:::tip
In other words, it's not a system where you receive a **fixed interest of n%** based on your deposit, like a conventional APY. Instead, the more you stake, the higher your proportion (**share**) of the total staked amount becomes, and the **larger your slice of the total reward pie**. The return rate is calculated retroactively based on the rewards received relative to the amount staked. However, as explained in the next section, because the **maximum stake size is limited, a minimum return can be calculated and converted into a specific annual yield**.
:::

KASH has predetermined and pre-issued its total Phase 1 vRWA and KASH supply to match the protocol's target gold quantity. 50 million KASH, corresponding to 50% of the total KASH supply, have been allocated for these initial risk rewards.

Although this structure introduces uncertainty into KASH's value, it is a system that **does not infinitely dilute the token's value through continuous issuance (inflation)**, and it makes the **future circulating supply and the total rewards a user can receive predictable**. This is different from structures that require continuous participation from new investors or assume vague protocol growth to pay out indiscriminate staking interest as seigniorage. 

:::warning
Fundamentally, however, the issuance and value backing of KASH are based on the profits of the gold mining business. As the gold mine develops and profits are converted into collateral, the value of the issued KASH will be gradually solidified.
:::

---

### Guaranteed Profit

The **total amount that can be staked in the staking pool is limited**. This is not an individual limit but a limit on the sum of all participants' stakes. This prevents an individual's stake from being diluted below a certain level of the total. Additionally, the total rewards from staking and the rewards for each cycle are predetermined. Therefore, users can **be certain of the minimum total interest they will receive from the moment of purchase (or staking)**.  

:::note
To be precise, the **maximum staking capacity is limited on a share basis**, but it is expressed here in terms of the staked amount to avoid explaining shares. In the future, more KASH will be needed to secure the same number of shares, so the limit in terms of the total staked amount will gradually increase. However, the preceding statement remains valid because the **value of a user's pre-secured shares will not be diluted below a certain point**. You can learn more details in the [Staking Document](/tech/staking/intro).
:::

KASH has adjusted the numbers to make this easy for sales participants to predict, specifically by "matching the sum of the sales volume and the total issuance of the bonus deposit amount (DCR) with the total reward amount." Therefore, when all rewards are distributed, **1 KASH staked is guaranteed to receive a cumulative total interest of at least 1 KASH over 3 years**, and the **EPB**, which determines the issuance ratio of the bonus deposit amount (DCR), will **directly correspond to the rate of return**.

:::note
The statement that 1 KASH staked guarantees a total interest of "at least" 1 KASH means that if other participants leave and the total staked amount decreases, your same stake will represent a relatively larger share, and you may receive more interest than expected in that month.
:::

A sales participant's final assets and profit are composed of the following elements:
+ **Sales Information**
    + Purchase Amount: The amount of KASH purchased through the sale. This becomes the "principal."
    + Target Profit Multiplier: The average EPB received based on the purchase timing. We'll call this "EPB."
+ **Staked Amount**
    + Staked Principal: KASH purchased and staked = 1x the principal
    + Bonus Deposit Amount: DCR issued based on EPB during the sale = (EPB-1)x the principal
+ **Interest over 3 years on the Stake**
    + Interest on Principal: Interest earned by staking the principal = 1x the principal
    + Interest from Bonus: Interest generated from the bonus deposit amount = 1x the DCR = (EPB-1)x the principal
    + Total: **The total interest profit is EPB times the principal.**

Excluding the non-withdrawable virtual asset, the bonus deposit amount (DCR), and after recovering your principal, your **final assets will be (EPB+1) times your principal**.

:::tip
+ 100 KASH purchase * EPB 20
    + 100 KASH + 1900 DCR = Total stake size of 2000 KASH
    + (After 3 years) 100 (principal) + 100 (interest on principal) + 1900 (interest on DCR) = 2100 KASH (+2000%)

+ 200 KASH purchase * EPB 5
    + 200 KASH + 800 DCR  = Total stake size of 1000 KASH
    + (After 3 years) 200 (principal) + 200 (interest on principal) + 800 (interest on DCR) = 1200 KASH (+500%)
:::

---

### EPB / DCR Graph Interpretation

Below is the EPB graph you can find on the staking page. This graph is for intuitive understanding and rough estimation.

:::info
It is difficult to determine your precise individual EPB, DCR, and periodic returns from the graph. You can easily calculate them using the [Reward Calculator](https://kash-rwa.io/calculator), and you can find the specific design and formulas in the [Staking Document](/tech/staking/intro).
:::

![KASH EPB Graph](/img/kash_staking_epb.png)

:::tip Graph Interpretation
    + **x-axis (horizontal):** KASH sales volume (q) in millions. So this graph covers sales from 0 to 5,000,000 KASH.
    + **y-axis (vertical):** The result of each function.
        + **Blue Graph (EPB):** The target profit multiplier given to the user. It is determined by the sales timing (sales volume).
        + **Red Graph (DCR):** The cumulative bonus deposit amount. This should be interpreted in the range of 0 to 25m KASH by multiplying by one million.
:::
:::tip What is the EPB (target profit multiplier) at a specific point in time?
        + The blue EPB graph starts at 25 and decreases as sales accumulate, eventually converging to 4.
        + At a specific point, for example, when 2m KASH have been sold (q=2), you can see that the EPB value is around 5.
:::
:::tip What is the EPB for a user participating at a specific time?
        + To calculate a user's final average EPB, you must consider the increase in q caused by their purchase amount.
        + If you buy 1m KASH at the 2m mark, your average EPB will be somewhere between the value at q=2 and q=3 (around 4.xx).
        + More precisely, the **"sales volume-weighted average" or "integral average" of the EPB curve becomes the user's average EPB**.
        + While the impact is generally small, it is greater the earlier you are in the sale and the larger your purchase size.
:::
:::tip What is the bonus deposit amount for a user participating at a specific time?
        + The DCR issued to a user is (Average EPB - 1) * Purchase Amount.
        + **This corresponds to the area under the EPB-1 curve (a definite integral).**
        + Alternatively, you can estimate it using the **difference in the red cumulative DCR graph**.
:::

---

### Per-Epoch Reward Graph

The reward distribution cycle is once every 30 days, for a total of 36 times, making the total period slightly shorter than 3 years. This distribution cycle is called an Epoch. 

The per-Epoch reward increases by a factor of 1.05 each time. Because of this, the rewards in the early Epochs are smaller than in the later ones. Here you can see how the total reward amount changes for each Epoch.

:::info
It is difficult to determine your exact per-Epoch reward from the graph. You can easily calculate it using the [Reward Calculator](https://kash-rwa.io/calculator), and you can find the specific design and formulas in the [Staking Document](/tech/staking/intro).
:::

![KASH Epoch Reward Graph](/img/kash_epoch_rewards.png)

:::tip Graph Interpretation
+ **x-axis (horizontal):** Epoch number. The range is 0-36 Epochs, corresponding to 3 years.
+ **y-axis (vertical):** The result of each function, in KASH units.
    + **Blue Graph (Total Reward):** The total reward amount distributed in that Epoch.
    + **Red Graph (Yield):** The reward amount relative to the principal and accumulated interest up to that Epoch, i.e., the yield.
:::
:::tip Reward Amount and Yield Over Time
+ The per-Epoch reward amount (simple interest) starts low at about 1% of the total and gradually increases to over 5% by the end.
+ The per-Epoch yield (compound interest) increases more gently than the reward amount because the denominator (the stake) grows with interest, eventually reaching around 3%.
+ This yield is calculated against the total stake including debt; the actual yield against your staked principal will vary depending on your DCR.
+ If there are no additional deposits or withdrawals after your initial sales stake, an individual's return will be their EPB times this yield rate, including the DCR.
:::

:::warning
The total Epoch length (1080 days) and the reward growth rate (1.05x) are subject to change and will be finalized at the start of the sale. The Epoch duration (30 days) may also change in the future but will not affect the total length, and the reward growth rate will be scaled to show the same growth rate over the same period as originally planned.
:::