---
id: kash-liquidity
title: 4. Liquidity and Price Regulation
description: Liquidity and Price Stabilization Algorithm
sidebar_position: 4
---

This document explains how you can buy and sell KASH, and what mechanisms are used to regulate the price of KASH stably.

---

### Summary

Here is a summary of the topics that will be explained below:

+ **KASH can be traded on an automated exchange on the blockchain called a DEX.** 
+ Trading on a DEX is similar to executing a **market order** on a centralized exchange that uses an order book system.
+ You can more easily **check prices, predict trade outcomes, and execute swaps** through the **app provided on our website.** 
+ To help you buy and sell KASH at a **more appropriate price**, we operate **PoL (Protocol Owned Liquidity) and RBS (Price Stabilization System).**
+ PoL is a strategy where the protocol secures liquidity to reduce price impact during trades, helping to **enable trading at a better price.**
+ RBS is a mechanism that **sets an appropriate price range** for KASH based on value metrics and **helps maintain the price within this range.**
+ Initially, the RBS operates conservatively, leading to higher KASH price volatility, but it is designed to eventually **converge to its value based on collateral (\$1+).**

---

### DEX and Liquidity

On the blockchain, tokens are exchanged with other digital assets through a type of exchange called a DEX (Decentralized Exchange). This may be less familiar than the more common centralized exchange services, but DEXs have the advantage of operating transparently on the blockchain and allowing various assets (tokens) to be traded without expensive listing fees.

:::note
The following explanation assumes the most common CPMM model, like Uniswap's. While various forms of DEXs exist, all sharing the characteristic of decentralization, knowing the specific type is not crucial to understanding the principles of liquidity and RBS explained here.
:::

To swap one asset for another, you need a **trading counterparty who has a sufficient amount of the asset at the price you want**. This is called **Liquidity**. If the asset you want to sell has low liquidity, you have to rely on a few buyers, which may force you to sell at increasingly unfavorable prices, or you might not even be able to sell the full amount you want.

Unlike centralized exchanges, DEXs generally do not have an order book. Instead, they operate on a principle where **swaps happen instantly at the current market price**, similar to a market order, and the **exchange rate gradually worsens as you trade more, naturally finding an appropriate price**. In this system, the **more liquidity there is in the market, the smaller the price fluctuations, allowing for trades at better prices.** 

KASH also primarily aims for trading through DEXs. Therefore, the more abundant the available liquidity, the more it becomes possible to trade KASH **close to the current market price** or to trade a **sufficiently large quantity at a reasonable price.**

---

### Protocol Owned Liquidity

Traditionally, many projects tend to rely on external investors or the community for initial liquidity. This carries the risk that liquidity can dry up and prices can fluctuate wildly if liquidity providers suddenly withdraw their funds. To solve this problem and ensure long-term stability, KASH adopts a PoL (Protocol Owned Liquidity) strategy, where **the protocol itself owns and manages a significant portion of the liquidity for KASH trading.**

The protocol directly secures liquidity to create a stable trading environment. One method is to offer users the opportunity to purchase KASH at a more attractive price in exchange for them providing liquidity (**LP tokens**) by pairing KASH with other assets. The liquidity gathered this way is owned and managed by the protocol and used to make KASH trading smoother.

+ **Advantages of PoL**
    + **Sustainable and Stable Liquidity:** Significantly reduces the risk of liquidity suddenly disappearing due to external factors, providing a reliable environment where users can trade KASH smoothly at any time.
    + **Creates a Revenue Stream for the Protocol:** Trading fees generated from the liquidity pool become additional revenue for the protocol, which can be reinvested into the ecosystem's development.
    + **Efficient Support for Price Stabilization:** In conjunction with the RBS mechanism described below, the protocol's direct ownership of liquidity allows it to stabilize the KASH price more effectively.

---

### KASH Value Assessment

:::caution
The value assessment and RBS presented here are based on the project's current design in its early stages to aid understanding. The system will be optimized as needed during operation. The exact operational range of the RBS and any active bond markets can be easily checked via the website app.
:::

To determine the appropriate current price of the KASH token, the protocol **comprehensively analyzes and utilizes the following key metrics**. These metrics are continuously updated based on market conditions and project progress (such as gold mine development status, vRWA liquidation status, etc.) and serve as an **important standard for the RBS below to decide whether to intervene in the market**.

+ **Fundamental Value (Collateral Value)**
    + **Face Value (FV):** The **theoretical size of the asset that will back 1 KASH** when all vRWA are liquidated as promised in the future.
    + **Discounted Face Value (DFV):** The value of the above FV assessed at the present time. Since future value is not yet realized, it is discounted to a lower present value to account for uncertainty (risk) and interest. This is a **conservative assessment of the minimum collateral value that one KASH holds at the present time.**

+ **Intrinsic Value (Including Future Profits)**
    + **Intrinsic Value (IV):** This is the FV **plus the value of expected future profits (staking interest).** It represents the total expected value that 1 KASH can bring to a user on average.
    + **Discounted Intrinsic Value (DIV):** The value of the above IV assessed at the present time. It is also discounted to account for future uncertainty and the time value of money. This can be seen as a **comprehensive assessment of KASH's potential at the present time.**

:::note
Intrinsic Value is a macro-level metric for token valuation and is not related to an individual's actual profit.
:::

The RBS compares KASH's market price with these four key value metrics (FV, IV, DFV, DIV) to determine whether the current KASH price is appropriate, too high, or too low.

---

### Value Metric Graph Analysis

Below is the graph of the four value metrics that you can find in the RBS documentation. It is the result of applying the example scenario below to the formulas and settings used by the protocol.

:::note
+ The risk-free annual interest rate is set to 3%.
+ The gold price is assumed to start at \$3,110.4/ozt, which sets the initial FV to \$1, and is assumed to increase by 10% annually.
+ It is assumed that an additional sale of 5m KASH sells out immediately in epoch 8, along with the addition of a new staking pool with 20m in rewards.
+ It is assumed that when PCR becomes available in epoch 18, 30% of initial sales users will exercise it.
+ The realization of vRWA is assumed to begin at epoch 12, with the quantity gradually increasing following a quadratic curve.
+ For simplicity, the vault's assets are assumed to increase only through vRWA realization.
:::

![KASH Valuation Graph](/img/kash_valuation_main_no_rbs.png)

:::tip FV (Face Value) Trend, Green Line
+ As the price of gold rises, the assets accumulated in the vault through vRWA increase more than initially expected.
+ The FV, which starts at an expected value of \$1, eventually becomes about \$1.3 as the gold price increase is partially reflected.
+ With 100 million KASH in circulation, this means the value-backing vault ultimately accumulates about \$130 million in assets.
:::

:::tip IV (Intrinsic Value) Trend, Red Line
+ Initially, the value is well above FV because there are many rewards yet to be distributed.
+ Later, as rewards are distributed, the remaining reward amount decreases and the circulating supply increases, reducing the average intrinsic value per KASH.
+ At epoch 8, it increases again because the impact of the new pool's rewards is greater than the increase in circulating supply from the additional sale.
+ At epoch 18, the rate of decrease temporarily slows as KASH recovered by the protocol through principal recovery is burned.
+ Under the current (Phase 1) design, it eventually converges to FV because plans after the staking reward distribution ends are not yet finalized.
:::

:::tip DFV, DIV (Discounted Value) Trends, Blue and Purple Lines Respectively
+ In the early stages of the project, the value is assessed as low because uncertainty is high and the future (3 years) used for valuation is distant.
+ At epoch 6, when exploration is completed, the project's trust level increases significantly for the first time, bringing the values somewhat closer to FV and IV.
+ At epoch 12, when vRWA liquidation begins, the trust level starts to rise, albeit slightly at first.
+ At epoch 18, when PCR becomes available and some users exercise it, KASH is burned, causing another significant rise.
+ Afterwards, as vRWA is liquidated in earnest, the trust level reaches its maximum, and the values eventually converge to FV and IV.
:::

---

### Price Stabilization

The KASH protocol operates a mechanism called **RBS** (Range Bound System) to maintain the token's stable value. The main goal of the RBS is to **manage the KASH token's market price so that it does not deviate significantly from its intrinsic value**, thereby reducing excessive volatility and supporting stable long-term value growth. It indirectly links the Reserve Vault and the KASH market price, acting as a **bridge that uses vault assets to support the real price of KASH.**

:::tip
+ If the price deviates from the protocol's intended range, the RBS **creates counter-pressure to stabilize it.**
+ The operating conditions of the RBS and the markets it opens are determined based on the value metrics calculated above.
+ The RBS **operates in two stages: a passive intervention zone (Cushion) and an active intervention threshold (Wall).**
+ **Initially, it only activates when the price rises excessively above IV or falls excessively below DFV.**
+ As the project progresses, its operational range widens towards the center (FV~DIV), building the price more precisely.
+ The potential range of KASH price fluctuation gradually narrows, **eventually converging to its fundamental (collateral) value, the Face Value (FV).**
:::

When the market price of KASH attempts to move outside a specific price range set by the value metrics calculated above, the RBS intervenes in the market in stages to stabilize the price. It establishes the concepts of a **price "Wall"** and a **"Cushion"** that acts before the price hits the wall.

+ **Price Wall:**
    + **Lower Wall ($Price_{LW}$):** A strong support line intended to prevent the KASH price from falling below this level. It is set at a price slightly lower than the most conservatively assessed present value, the $DFV$. If the market price tries to break below this line, the protocol actively buys KASH to stop the decline.
    + **Upper Wall ($Price_{UW}$):** A strong resistance line to manage and prevent the KASH price from rising too excessively above this level. It is set at a price slightly higher than the $IV$, which reflects all future growth potential. If the market price tries to break above this line, the protocol opens a market to sell KASH to cool down the overheating.

+ **Cushion Zone:**
    + A preliminary area that gently absorbs market forces and begins a gradual response before the market price directly hits the wall. A key feature of this cushion zone is that its range changes dynamically based on the project's credibility level.
    + **Credibility**
        + This is the value used for the risk discount when calculating the DFV and DIV metrics. It is set very low initially and gradually increases with project progress, such as exploration completion and vRWA liquidation (securing collateral).
        + **Early Project Stage (when credibility is still low):** The cushion zone is set very close to each price wall, which is determined most conservatively.
        + **Project Maturity (when credibility is high):** The range of the cushion zone gradually widens towards more fundamental metrics. For example, the upper boundary of the lower cushion could expand from its starting point at $Price_{LW}$ up to the level of $FV$ or $DIV$. This signifies that the protocol has more confidence in its value metrics and allows for the absorption of a wider range of price fluctuations.
    + **Lower Cushion Price ($Price_{LC}$):** Determined between $Price_{LW}$ and $\min(FV, DIV)$ based on project credibility.
    + **Upper Cushion Price ($Price_{UC}$):** Determined between $Price_{UW}$ and $\max(FV, DIV)$ based on project credibility.

---

### RBS Operational Range Graph

This is a graph showing the operational range of the RBS overlaid on the previous value metrics example graph.

![KASH RBS Graph](/img/kash_valuation_main_with_rbs.png)

:::tip Graph Interpretation
+ The upper red area is the Upper Cushion, and the brown line at its edge is the Upper Wall.
+ The lower blue area is the Lower Cushion, and the dark blue line at its edge is the Lower Wall.
+ When the market price enters this cushion range, the RBS begins passive intervention. If it crosses the wall, active intervention occurs.
+ The white empty space between the two cushion zones is the range where the KASH price can fluctuate freely based on market sentiment.
:::

:::tip Changes in the Cushion Zone
+ In the early stages of the project, credibility is low, so the cushion zone is formed very close to the walls.
+ This makes the empty space between the cushions, where the RBS is inactive, wide, leading to quite high volatility for the early KASH price.
+ Later, as exploration is completed and vRWA is liquidated, the cushion zone gradually widens towards DIV and FV.
+ Eventually, DIV also converges to FV, and the RBS is almost always active, stabilizing the price at FV.
:::

---

### Bond Market

RBS's market intervention is carried out through a more indirect and sophisticated method of **issuing bonds** rather than directly buying and selling KASH on the market. Also, depending on the conditions, the **payment for the bond is distributed over a period (vesting)**, which reduces short-term speculative behavior and contributes to long-term price stability.

+ **Operating Funds**
    + **When issuing KASH purchase bonds:** Uses **funds from the vault and stops operating if funds fall below a certain level.** 
    + **When issuing KASH sale bonds:** Uses KASH from an **initial distribution** to the liquidity pool. It stops operating when these are depleted.

:::warning
It's important to note that in KASH Phase 1, purchase bonds only operate when there are sufficient liquid assets in the vault, and sale bonds only operate while the initially distributed KASH remains. Especially in the early stages of the project, it may be difficult to open a purchase bond market due to insufficient vault assets.
:::

+ **When the KASH price tries to fall too low:** The protocol opens a "KASH Purchase Bond" market. These are bonds where if a user buys them with KASH, the protocol repays the principal with liquid assets.
    + **Price within the lower cushion (Passive Intervention):** To be sold only if the price is attractive enough, the protocol starts buying KASH at the lower wall price and slowly raises the price towards the start of the cushion zone. The payment is made over a period. This has the effect of gradually reducing selling pressure and offsetting the price decline.
    + **Price below the lower wall (Active Intervention):** The protocol buys KASH at the lower wall price and repays the principal immediately. This allows for arbitrage, directly absorbing selling pressure on KASH and defending against a price drop.

+ **When the KASH price tries to rise too high:** The protocol opens a "KASH Sale Bond" market. These are bonds where if a user buys them with liquid assets, the protocol repays the principal with KASH.
    + **Price within the upper cushion (Passive Intervention):** To be bought only if the price is attractive enough, the protocol starts selling KASH at the upper wall price and slowly lowers the price towards the start of the cushion zone. The payment is made over a period. This has the effect of gradually reducing buying pressure and offsetting the price rise.
    + **Price above the upper wall (Active Intervention):** The protocol sells KASH at the upper wall price and repays the principal immediately. This allows for arbitrage, directly absorbing buying pressure on KASH and defending against a price rise.

This bond-based approach provides reasonable trading opportunities for market participants while allowing the protocol to stabilize the market and simultaneously accumulate assets, building a foundation for even more stable stabilization in the future.

:::info
You can learn more about the specific operations and formulas related to value assessment and the RBS in the [Valuation Model document](/tech/rbs/valuation), the [Stabilization Mechanism document](/tech/rbs/stabilization), and the [Bond Market document](/tech/rbs/bond).
:::

---

Through these efforts, KASH aims to establish itself as a **stable digital asset based on real value**, one that users can trust and partner with even in the volatile cryptocurrency market.