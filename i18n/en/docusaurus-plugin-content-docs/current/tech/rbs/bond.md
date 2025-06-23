---
id: bond
sidebar_position: 3
---

# Bond Market

RBS's market intervention is primarily conducted through the indirect method of issuing bonds. When the protocol determines a need for intervention based on the predefined price Walls and Cushions, it opens a bond market under specific conditions to regulate the supply and demand of KASH.

Initially, the bond market may be operated by the protocol's managing entity, with the goal of transitioning to community governance and an automated system in the future.

---

### Bond Issuance

The reason for using bond issuance instead of direct market making is to leverage the following features and benefits:

+ **Gradual Market Impact**:
    Since bonds are issued under set conditions (price, quantity, duration, etc.), they affect the market gradually rather than causing a sudden shock. This can provide market participants with time to adapt, mitigating volatility and encouraging stable price adjustments.

+ **Protocol Asset Management and Securing PoL (Protocol Owned Liquidity)**:
    + **When KASH price falls (KASH purchase bonds)**: The protocol issues bonds to buy KASH using liquid assets from the vault. This not only supports the KASH price but also allows the protocol to absorb circulating KASH, strengthening its PoL and building a foundation for future market stabilization resources.
    + **When KASH price rises (KASH sale bonds)**: The protocol issues bonds to sell its KASH holdings, thereby regulating market supply. In this process, it can acquire other assets like stablecoins, diversifying the vault's asset composition and increasing its financial stability.

+ **Participant Incentives and Market Participation**:
    Bonds with prices adjusted according to market conditions can offer reasonable trading opportunities to participants, which can act as a factor to encourage voluntary community participation in the market stabilization process.

+ **Long-term Effects through Vesting**:
    By applying vesting conditions (distributing assets over a period) to assets exchanged through bonds, the protocol can reduce short-term speculative trading and promote long-term protocol participation and price stability.

---

### Market Conditions

The protocol determines whether to operate the bond market and under what conditions by comparing the KASH market price ($P_{market}$) with the RBS price metrics as follows:

1.  **$P_{market} < Price_{LW}$ (Below the Lower Wall)**
    + **Intervention Intensity**: Active Intervention
    + **Bond Type**: KASH Purchase Bond (protocol buys KASH)
    + **Asset for Exchange (provided by user)**: KASH
    + **Asset Paid (provided by protocol)**: Liquid assets from the vault (e.g., USDT, USDC)
    + **Exchange Price**: $Price_{LW}$
    + **Vesting Period**: Immediate
    + **Issuance Limit**: Determined within a certain percentage ($N_{LW}$%) of the available liquid assets in the vault.

2.  **$Price_{LW} \le P_{market} < Price_{LC}$ (Entering the Lower Cushion)**
    + **Intervention Intensity**: Passive Intervention
    + **Bond Type**: KASH Purchase Bond
    + **Asset for Exchange (provided by user)**: KASH
    + **Asset Paid (provided by protocol)**: Liquid assets from the vault
    + **Exchange Price**: Gradually moves from $Price_{LW} \rightarrow Price_{LC}$ over time
    + **Vesting Period**: Vested (split over time)
    + **Issuance Limit**: Operated on a limited basis within a certain percentage ($N_{LC}$%, where $N_{LC} < N_{LW}$) of available liquid assets in the vault.

3.  **$Price_{UC} < P_{market} \le Price_{UW}$ (Entering the Upper Cushion)**
    + **Intervention Intensity**: Passive Intervention
    + **Bond Type**: KASH Sale Bond (protocol sells KASH)
    + **Asset for Exchange (provided by user)**: Typically LP tokens containing KASH or other liquid assets
    + **Asset Paid (provided by protocol)**: KASH from the liquidity pool/treasury
    + **Exchange Price**: Gradually moves from $Price_{UW} \rightarrow Price_{UC}$ over time
    + **Vesting Period**: Vested (split over time)
    + **Issuance Limit**: Operated on a limited basis within a certain percentage ($N_{UC}$%) of the KASH in the liquidity pool/treasury.

4.  **$P_{market} > Price_{UW}$ (Above the Upper Wall)**
    + **Intervention Intensity**: Active Intervention
    + **Bond Type**: KASH Sale Bond
    + **Asset for Exchange (provided by user)**: Typically LP tokens containing KASH or other liquid assets
    + **Asset Paid (provided by protocol)**: KASH from the liquidity pool/treasury
    + **Exchange Price**: $Price_{UW}$
    + **Vesting Period**: Immediate
    + **Issuance Limit**: Determined within a certain percentage ($N_{UW}$%, where $N_{UW} > N_{UC}$) of the KASH in the liquidity pool/treasury.

---

### Operating Resources

The effective operation of the RBS mechanism, especially the bond market, requires resources that the protocol can utilize. While the RBS may have its own dedicated account in the future, in Phase 1, KASH's bond market asymmetrically uses different funding sources depending on whether it's buying or selling.

+ **When Issuing KASH Purchase Bonds**:
    + When a bond market is opened, it borrows the necessary funds from the Reserve Vault at once, up to the bond limit.
    + During the early stages of the project when the Reserve Vault has insufficient assets, no buy-side markets will be opened.
    + The borrowed funds are held in a temporary repository (RBS Escrow Instance), and the purchased KASH is also stored there.
    + When the bond market closes, the purchased KASH is burned in a batch, and any remaining liquid assets are returned to the vault.

+ **When Issuing KASH Sale Bonds**:
    + When the initial supply is distributed, the Liquidity Treasury is allocated KASH equivalent to 10% of the total.
    + The funding source for the sell-side market is the KASH in this treasury. It sells the KASH, and the received assets (mainly LP tokens) are also stored in the treasury.
    + Consequently, in Phase 1, once the allocated KASH is depleted, no more sell-side markets will be opened.

---

### RBS Escrow

When opening a KASH purchase bond market, the system utilizes an "RBS Escrow" to borrow assets from the vault. This is a mechanism to use the vault's funds for transparent accounting without granting the RBS module itself excessive power to utilize vault assets directly. For each market, a separate contract instance is created to isolate the assets. The required amount is borrowed in advance, and the resulting assets are repaid in a lump sum when the market closes.

+ **Escrow Amount**: The amount to be borrowed from the vault when the market opens. It is set to the maximum amount of assets that could be spent, based on the worst-case price.
    $$
    Amount_{Escrow} = 
    \begin{cases}
        Price_{LW} \times MarketCap & (MarketType = Aggressive) \\
        Price_{LC} \times MarketCap & (else)
    \end{cases}
    $$

+ **Return Rate**: A metric to measure whether the borrowed assets were appropriately repaid as initially intended when the market closes.
    $$
    Rate_{return} = \frac{KASH_{bought}}{MarketCap} + \frac{Asset_{repay}}{Amount_{Escrow}}
    $$
    + $KASH_{bought}$: The amount of KASH purchased through the bond market.
    + $Asset_{repay}$: The remaining portion of the borrowed assets not used for purchases.

:::note
The Return Rate is not a metric of how successful or efficient the market was. It is a value used for verification, confirming that vault funds were used within the expected scope if the value is 1 or greater.
:::

---

### Formula Modification

In Phase 1, the operation of the RBS using this Escrow system can cause temporary discrepancies in the vault assets and collateralization ratio. Accordingly, the formulas for the value metrics are modified to reflect the impact of the RBS as follows:

+ **$EVV$ (Expected Vault Value)**:
    $$
    \text{EVV}_t = (CVV_t + \sum{EIV}_t) + Gold_{F,t} \times Price_{gold, t}
    $$
    + $EIV$ (Escrow Instance Value): The value of assets held within an individual escrow instance. Although temporarily outside the Reserve Vault, these are still assets intended to support the value of KASH.

+ **$FV$ (Face Value)**:
    $$
    FV_t = \frac{EVV_t}{Supply_{total,t} - \sum{Balance_{instance,t}}}
    $$
    + $Balance_{instance}$: The amount of KASH held by an individual Escrow Instance through purchase bonds. It is excluded from the supply as it is scheduled to be burned immediately upon market closure.

This ensures that asset fluctuations in the protocol due to bond market transactions are immediately reflected in each metric, providing a more accurate basis for judgment. In particular, it helps prevent the problem where opening a buy-side market could cause a temporary drop in value metrics (due to the decrease in vault assets), which might otherwise trigger further issues.