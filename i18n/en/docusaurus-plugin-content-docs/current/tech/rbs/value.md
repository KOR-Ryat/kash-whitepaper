---
id: valuation
sidebar_position: 1
---

# Valuation Model

The value of the KASH token is assessed based on the future value of the Reserve Vault and its potential for staking interest. To calculate its present value, this assessment is adjusted to reflect the project's changing risk over time and the time value of money.

---

### Gold Price

Although the project anticipates a long-term rise in gold prices, this optimistic forecast is not incorporated into the formulas. For value conversions, such as the valuation of intrinsic value and the calculation of discount factors, the gold price at the time of valuation is used.

+ $P_{gold, t}$: The price of gold at time t (USD/oz)

For example, in the Face Value calculation below, the "Future Vault Value" is calculated by predicting the "future quantity of gold to be delivered" but multiplying it by the "current gold price."

---

### Face Value

The most fundamental metric for evaluating the KASH token's value is its Face Value (FV).

+ $FV$: Represents the future value of one KASH token when all vRWA contracts in the vault are fully realized.
    $$
    FV_t = \frac{EVV_t}{Supply_{total}}
    $$
    + $Supply_{total}$: The total supply of KASH (Total Supply, KASH).
    + $EVV$, Expected Vault Value: The expected future value of the vault. It is the sum of assets already in the vault and the value expected to be realized in the future (USD).
        $$
        EVV_t = CVV_t + {Gold_F}_t \times P_{gold, t}
        $$
        + $CVV$, Current Vault Value: The value currently realized in the vault (USD).
        + $Gold_F$: The remaining vRWA in the vault to be exchanged for assets of equivalent value to gold in the future (ozt).

---

### Intrinsic Value

This is the Intrinsic Value (IV), which includes the value that can be obtained through KASH. For Phase 1, it is currently calculated considering only the expected staking rewards.

+ $IV$: The value of KASH considering the additional value expected to be gained in the future. It is determined as an average for all tokens, not based on the actual profitability of individual tokens.
    $$
    IV_t = FV_t \times \text{Expected\_Rebase}_t
    $$
    + $\text{Expected\_Rebase}_t$: The expected quantity of KASH at the project's end, when one current KASH reflects the staking yield.
        $$
        \text{Expected\_Rebase}_t = 1 + (\sum_{k = Epoch(t)}^{N_{Epochs}} Reward_{epoch,k}) / Supply_{circulating,t}
        $$
        + $Epoch(t)$: The epoch number at time t.
        + $Supply_{circulating,t}$: The conservatively calculated maximum circulating supply at time t. It includes stakeable deposits and rewards (as they can be unstaked at any time) but excludes allocations to the Insurance, Team, and Operations pools, which cannot circulate in the market until the end of Phase 1.
            $$
            Supply_{circulating,t} = Supply_{sales,t} + Supply_{reward,t} + Supply_{liquidity,t}
            $$
            + $Supply_{sales,t}$: KASH tokens sold via initial sales.
            + $Supply_{reward,t}$: KASH tokens distributed as staking rewards.
            + $Supply_{liquidity,t}$: KASH tokens circulated through the bond market for PoL.

---

### Discounting Future Values

Future realized value is assessed at its present value by applying discounts for time and risk factors. KASH uses two discount factors:

1.  **Time Discount Factor ($DF_T$)**: A factor to convert future value into present value, calculated using the risk-free interest rate.
    $$
    DF_{T,t} = \frac{1}{(1 + R_{RF})^n}
    $$
        + $R_{RF}$: Risk-Free Annual Interest Rate.
        + n: The remaining period from the valuation time t to the project's end (in years).

2.  **Risk Discount Factor ($DF_R$)**: A factor that reflects the risk associated with the uncertainty of achieving the project's goals. The discount rate is high in the early stages when risk is high, and it decreases as the project progresses and the acquisition of assets in the vault becomes more certain.
    $$
    DF_{R,t} = \min(1 - BaseTrust_t, \left(\frac{CVV_t}{EVV_{final} - CRV_t}\right)^p) + BaseTrust_t \\
    0 \le BaseTrust_t \le DF_{R,t} \le 1
    $$
    + $CVV$, Current Vault Value: The vault value realized to date. It gradually increases as vRWA is realized.
    + $EVV_{final}$: The expected vault value at the end of the project when all gold has been delivered.
    + $\text{BaseTrust}$: A minimum trust constant for the project. It may be adjusted upwards at key project milestones (e.g., from 0.2 initially to 0.8 after exploration completion).
    + $p$: A coefficient (set value) that adjusts the sensitivity of $DF_R$'s change as $CVV$ converges to $EVV_{final}$.
    + $CRV$, Current Reserve Value: The current converted value of the reserve supply (Insurance Pool, Team Supply) in USD.
        $$
        CRV_t = \min( (CIS_t + CTS_t) \times \frac{FV_{final}}{(1 + R_{RF})^n}, EVV_{final} )
        $$
            + $CIS$, Current Insurance Supply: Current token amount in the Insurance Pool (KASH).
            + $CTS$, Current Team Supply: Current token amount in the Team Supply (KASH).
            + $FV_{final}$: Expected Face Value at the project's end (USD/KASH).

---

### Discounted Value Metrics

By applying these discount factors, each value of the KASH token is assessed at the present time as follows:

1.  **Discounted Face Value ($DFV$)**: The future Face Value (FV) discounted to its present value, considering time and risk factors.
    $$
    DFV_t = FV_t \times DF_{T,t} \times DF_{R,t}
    $$

2.  **Discounted Intrinsic Value ($DIV$)**: The future Intrinsic Value (IV) discounted to its present value, considering time and risk factors.
    $$
    DIV_t = IV_t \times DF_{T,t} \times DF_{R,t}
    $$

---

### Example Graph

The following is an example graph showing how each value metric changes per epoch under the current protocol settings.

![KASH Valuation Graph](/img/kash_valuation_main_no_rbs.png)

+ The risk-free annual interest rate is set to 3%, and the minimum project trust level is set at 0.2, increasing to 0.5 upon exploration completion, and 0.7 when PCR becomes available.
+ For ease of value comparison, the gold price is assumed to start at approximately 3110.4 USD/ozt (so that FV is 1 USD at Epoch 0) and is assumed to increase by 10% annually.
+ The realization of vRWA is assumed to begin at exploration completion and gradually occur following a quadratic curve. The exact schedule will be confirmed upon exploration completion.
+ For simplicity, the vault's assets are assumed to increase only through vRWA realization. In reality, the final asset value of the vault may fluctuate due to factors like RBS operations.
+ It is assumed that an additional staking pool with 20m in rewards is added, along with an additional sale of 5m KASH that sells out immediately in epoch 8, under the current initial sales settings.
+ It is assumed that when PCR becomes available in epoch 18, 30% of initial sales users will exercise it.

In this scenario, the surrounding metrics move as follows:

![KASH Valuation Graph](/img/kash_valuation_sub_metrics.png)

---

The following sections will explain how the RBS operates based on these value metrics.