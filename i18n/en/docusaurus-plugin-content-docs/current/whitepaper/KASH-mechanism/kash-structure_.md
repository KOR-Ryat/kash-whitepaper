---
id: kash-structure_
title: 1. Collateralized Issuance and the Value of KASH
description: Reserve token issuance structure and the reserve pool
sidebar_position: 0
---

This document explains the structure through which KASH, the core currency of the KASH project, is issued and how it derives its value.

:::warning
This document and others in this section are intended to introduce the structure of KASH to non-experts. Participants must understand and be aware that **the value formation of KASH is fundamentally dependent on the success or failure of the gold mining business**. For the purpose of focusing on the mechanism, the following content will be explained **under the assumption that the gold mining business proceeds as planned**. 
:::

---

### Value Backed by the Vault

KASH is a collateral-backed token, meaning it is **backed by a Reserve Vault that supports its value**. The structure is designed so that the total value of all KASH is **proportional to the value of this vault**. This means the value of a single KASH can be objectively assessed by dividing the total asset value in the vault by the total supply of KASH. This is a fundamental difference from pure utility tokens, whose value is formed solely by user consensus.

:::note
Within the project, KASH has significance beyond being just a collateral-backed token. However, here we will focus on the structure of KASH's collateral-based issuance and its value formation.
:::

As of Phase 1, the vault contains a total of 32,000 vRWA, and accordingly, 100 million KASH are issued as the initial supply. Therefore, at the project's outset, **one KASH token holds a value equivalent to 1/3125 of one vRWA**. 

:::tip
One vRWA represents a claim on 1 troy ounce (ozt) of gold. If all vRWA are realized at a gold price of \$3,300/ozt, the vault will accumulate a total of \$105 million in assets. Therefore, if this gold price is maintained, it can be estimated that **one KASH will theoretically have a final backing value of approximately \$1.05**.
:::

The fact that the vault "backs" the value of KASH **does not mean that it can be directly redeemed** for vault assets, nor does it mean the foundation guarantees a certain price by unconditionally buying KASH with vault funds. While such methods could be adopted later if necessary, during Phase 1, the influence is **only indirect**, through the opening of a bond market to buy or sell KASH.

---

### Indirect Price Support

The price of KASH is indirectly regulated by a system called the Range Bound System (RBS), which **calculates the appropriate value of KASH based on various metrics, including the current and future value of the vault, and stabilizes the price by opening a bond market if the market price deviates excessively**. 

+ If the KASH price falls below a certain level, the protocol issues KASH purchase bonds, using vault assets to buy back and burn KASH from the market.
+ If the KASH price rises excessively, it creates counter-pressure by selling KASH allocated to the liquidity pool, preventing overheating while accumulating liquidity for the protocol.

Therefore, even if the vault is sufficiently capitalized, the **price can fluctuate based on market sentiment** up to the threshold where the RBS begins to operate. Especially in the early, **highly volatile period, the RBS is set to operate conservatively** to protect the vault's limited assets. As a result, this creates a wider neutral range initially, leaving the **price more exposed to fluctuations**. The system is **designed so that as the project progresses, the market price gradually converges towards its real collateral value**.

This indirect support structure is a design choice to overcome the structural limitations of existing RWAs (e.g., legal/regulatory issues, off-chain trust problems) discussed earlier in the whitepaper. While bypassing the regulatory risks and liquidity bottlenecks of a direct redemption model, it offers the following advantages:
+ **Asset Efficiency**: Instead of depleting limited initial assets on direct redemptions, it allows for efficient liquidity provision across the protocol.
+ **Value Growth**: The vault's assets are used to gradually increase its value and accumulate more assets through mechanisms like RBS operations.
+ **Long-term Vision**: It lays the foundation for KASH to grow as a long-term utility token, beyond a one-time funding project.

:::info
You can learn more about the RBS in the general investor document on [Liquidity](./kash-liquidity) or the [RBS Technical Document](/tech/rbs/intro).
:::

---

### Future Value and Its Realization

The **vRWA** that initially constitute the vault are claims on **"future"** gold. This implies two characteristics. First, it assumes the realization of an unconfirmed future. Especially at the project's outset, most of the vault's assets exist as vRWA, meaning the project **heavily relies on this yet-to-be-realized future value**. This is the biggest initial risk inherent in KASH's value, and it is the **rationale for providing extraordinary rewards**, such as high staking yields (EPB) and the right to principal recovery (PCR), to **early participants who take on this uncertainty**.

:::info
The reward design for this initial risk is detailed in [Initial Investor Rewards](./staking-&-reward).
:::

As the project progresses and gold production begins in earnest, these **vRWA are gradually realized according to a promised schedule**. In this process, vRWA are burned, and the vault is filled with corresponding liquid assets, such as USD-pegged stablecoins, and physical gold-backed RWAs. Consequently, as the project moves forward, the vault's collateral composition **gradually shifts from 'potential value' to 'realized value'**, which makes KASH's collateral more robust over time. 

In the event of a setback in mine development that prevents sufficient vRWA realization on schedule, the protocol will **burn an amount of issued KASH equivalent to the shortfall to maintain the collateral ratio**. The **Insurance** allocation (10%), pre-issued for this purpose, will be used first. If this is insufficient, the policy is designed so that the **team allocation (10%) will also be used to cover vRWA liquidation**.

:::info
The distribution plan for KASH issued in Phase 1 can be found in the [Tokenomics](/whitepaper/tokenomics) document.
:::

---

### Partial Tracking of Gold Value

Another characteristic arising from the future nature of vRWA is that if the price of gold rises, the amount realized per vRWA at that time also increases. This means that the amount accumulated in the vault depends on two factors: **changes in the gold price** and **when the vRWA are realized into liquid assets**. The value backing each KASH will change accordingly. 

Since vRWA are realized gradually as the project progresses, KASH **partially tracks the value of gold** but is **not fully pegged to it on a 1:1 basis**. For example, if vRWA were realized at a constant rate each period, the final value of the vault would be realized at a rate proportional to the Time-Weighted Average Price (TWAP) of gold. 

Under the current plan, more vRWA are scheduled to be realized in the later stages of the project than in the early stages. Therefore, the gold price in the later stages will have a greater impact on the average value, making it more closely influenced by the final gold price rather than just the TWAP. This means that **simply holding KASH can also serve as a partial investment in gold**.

:::info
The **next document** discusses KASH value predictions under several future gold price scenarios in more detail.
:::

---

### Collateral Management in the Vault

Changes to the **collateral assets within the vault**, which back the value of KASH, are **strictly limited** to the purposes of vRWA liquidation and KASH issuance/burning. The vault is designed **not to compromise the collateralization ratio** per KASH, typically by requiring an equivalent value of other assets to be deposited or by burning the withdrawn KASH.

+ **New KASH Issuance**
    + Collateral assets equivalent to the desired issuance amount are provided to the vault.
    + KASH is issued in proportion to the value of the collateral and the current value of KASH.
+ **vRWA Redemption and Risk Response**
    + Secured assets are deposited, and corresponding vRWA are withdrawn and burned to realize the vRWA.
    + In case of a schedule delay, insurance-purpose KASH can be burned to liquidate vRWA of the corresponding value.
+ **Price Stabilization via RBS**
    + When the RBS issues KASH purchase bonds, the vault provides assets as collateral for those bonds.
    *   The KASH purchased with the bond proceeds is burned immediately upon the market's closure.
    + The purchase price is set advantageously relative to the collateralization ratio, based on metrics calculated from the vault's value.
    + As a result, the reduction in total KASH supply outweighs the decrease in vault assets, preserving the vault's value.
+ **Recovery of Initial Issuance via PCR**
    + When the PCR exercise period begins, assets equivalent to the initial sales proceeds are taken from the vault.
    + Each user can, if they choose, exercise PCR to get their KASH back from the staking pool.
    + The protocol reclaims and burns the returned KASH and gives back assets equivalent to the user's sales participation amount.

:::warning
However, the PCR, an early investor protection mechanism, is the **only exception that can potentially lower the collateralization ratio** under certain market conditions. This is explained in more detail in the 'Principle of Burn-for-Collateral Withdrawal' section below.
:::

---

### Principle of Collateral-Based Issuance

The value of an individual KASH token is determined by dividing the total value of the vault by the total number of tokens. However, unlike treasury-backed tokens that can often be arbitrarily inflated by the protocol without adding collateral, KASH follows the principle that **the foundation can only issue new KASH equivalent to the collateral it deposits into the vault**. 

The **issuance ratio is set to maintain the current collateralization ratio**. This is another difference from typical stablecoins with fixed collateral. Through this policy, KASH has a structure where, when the protocol generates revenue, it can accumulate it in the vault, **returning profits to all KASH holders without diluting the collateral value**. 

:::tip
If the total value of the vault is \$120 million and the total supply of KASH is 100 million, the collateral value of one KASH is \$1.20. To issue more, collateral equivalent to \$1.20 per KASH must be deposited into the vault.
:::

:::note
The initial issuance in KASH Phase 1 is for a fixed amount and ratio, with the purpose of financing the development of the Buru gold mine in Indonesia and distributing the profits from it. Most of the issuance will be used for providing returns to investors and supplying liquidity.
:::

Consequently, KASH can **increase its money supply in line with protocol growth without value dilution from inflation**, providing a foundation as a utility token. In the future, we plan to leverage KASH's established stability to expand into various DeFi utilities. Additional issuance will occur accordingly and will also adhere to the principle of preserving the collateralization ratio.

---

### Principle of Burn-for-Collateral Withdrawal

As explained earlier, the basic principle for withdrawing assets from the vault that backs KASH's value is to either deposit corresponding assets or burn the KASH being withdrawn. In the case of a burn-for-withdrawal, the **vault's assets are consumed** by the buyback, but the **total supply of KASH decreases**, increasing the **share that each remaining KASH represents** in the vault. Notably, if the cost of the buyback is lower than the current collateral value of KASH, the **average collateral value per KASH will actually increase**.

KASH also has a **deflationary policy** of buying back and burning market KASH under certain conditions. The RBS actively utilizes this as a mechanism to **halt KASH's price decline while simultaneously increasing its collateralization ratio**. Buybacks through the RBS bond market are always conducted at a **price below face value**, and **all purchased KASH are burned**.

Another deflationary mechanism is the PCR, the right for early investors to recover their investment. When PCR is exercised, the received KASH is also burned, but the value given out is calculated based on the **fixed initial sales price of 1 USD**, not the current collateral ratio. Therefore, **if the collateral value per KASH has fallen below 1 USD (e.g., due to a sharp drop in gold prices), this could lead to a further decrease in the collateralization ratio**. Conversely, if the value of gold trends upwards or if the collateral value exceeds 1 USD due to RBS operations, the more users exercise PCR for liquidity purposes, the higher the KASH value will become.

:::info
+ **Staking Pool**: The place where investors deposit the KASH they purchased to receive rewards.
+ **Learn More**: See the general investor document on [Initial Investor Rewards](./staking-&-reward.md) or the [Staking](/tech/staking/intro) section of the technical whitepaper.
:::

This is the only case that can compromise KASH's collateralization ratio, and it is a right granted only for the initial risk. In the future, as long as there is no sharp decline in the value of the assets within the vault, the **collateral value per KASH will have the potential to steadily increase**.

---

The next document shows examples of KASH's value under several gold price scenarios.