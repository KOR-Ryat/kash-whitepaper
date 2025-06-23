---
id: stabilization
sidebar_position: 2
---

# Stabilization Mechanism

The RBS is a market intervention mechanism designed to mitigate abnormal deviations of the KASH token's market price from its defined value metrics and, in the long term, to guide the token price into a range that aligns with its intrinsic value.

---

### Conservative Approach

In the early stages of the Phase 1 ecosystem, predicting the token's market volatility is particularly difficult due to factors like the supply increase from staking rewards and the unrealized value of vRWA in the vault. The protocol recognizes that its top priority in this situation is to support the tangible value of KASH by successfully advancing the project, liquidating vRWA as promised, and securing real value in the vault. Therefore, the RBS operates on the principle of interpreting the market conservatively in the initial stages, intervening in a limited capacity within a range that allows the protocol to defend and grow the vault's value over the long term.

---

### Assessing Market Price

The KASH protocol assesses the current market situation by comparing the market price of the KASH token ($P_{market}$) with the previously defined key value metrics—Face Value (FV), Intrinsic Value (IV), Discounted Face Value (DFV), and Discounted Intrinsic Value (DIV). This assessment forms the basis for determining whether and how the RBS mechanism should intervene.

1.  **$P_{market} > IV_t$ : Significantly Overvalued**
    *   **Interpretation**: The market price has exceeded the intrinsic value (IV), which accounts for all future expected staking rewards. This could be due to short-term speculative demand or irrational exuberance and is considered unsustainable.
    *   **RBS Response**: Implement active price stabilization measures to secure Protocol-Owned Liquidity (PoL) and accumulate vault value.

2.  **$IV_t \ge P_{market} > \max(DIV_t, FV_t)$ : Premium Zone**
    *   **Interpretation**: The market price is below the intrinsic value (IV) reflecting future expected rewards, but higher than the value assessed at the present time after discounting for risk and time (the higher of DIV or FV). This indicates that the market is positively assessing the project's future growth potential and staking rewards, forming a certain level of premium.
    *   **RBS Response**: Monitor market conditions and consider buffering actions if excessive volatility occurs.

3.  **$\max(DIV_t, FV_t) \ge P_{market} \ge \min(DIV_t, FV_t)$ : Equilibrium Zone**
    *   **Interpretation**: The market price is moving within a reasonably assessed value range for the current time.
        *   If $DIV_t \ge FV_t$, this range can be interpreted as $DIV_t \ge P_{market} \ge FV_t$. This is seen as a stable state where the market reflects the present value of staking rewards, trading above the basic collateral value (FV).
        *   If $FV_t > DIV_t$, this range can be interpreted as $FV_t \ge P_{market} \ge DIV_t$. This occurs when the discount rate is higher than the expected staking rewards, such as in the project's early stages.
    *   **RBS Response**: The default is to leave it to market autonomy without special intervention.

4.  **$\min(DIV_t, FV_t) > P_{market} \ge DFV_t$ : Slightly Undervalued**
    *   **Interpretation**: The market price is higher than the basic Discounted Face Value (DFV) but has fallen below the Discounted Intrinsic Value (DIV) which considers future reward value, or the simple Face Value (FV). This might suggest that market participants are somewhat conservative about the project's future growth or profitability, or are facing temporary selling pressure.
    *   **RBS Response**: Closely monitor market conditions and prepare defensive measures in case of a further decline.

5.  **$DFV_t > P_{market}$ : Significantly Undervalued**
    *   **Interpretation**: The market price has fallen below even the most conservatively assessed Discounted Face Value (DFV). This means the token is trading at a price significantly lower than its fundamental value, possibly due to excessive pessimism or a sell-off caused by external market shocks.
    *   **RBS Response**: Aim to defend the token's value and restore market confidence through active price support measures.

:::note
The presented market assessment is based on the project's initial design. As the project progresses, the protocol will flexibly adjust and optimize the intervention intensity and methods by comprehensively considering the relative importance of each value metric, market conditions, and protocol maturity to finalize the system.
:::

---

### Wall and Cushion Price

To mitigate excessive volatility in the KASH token price and gradually guide it toward its intrinsic value, the RBS sets up price "Walls" and "Cushions" based on the predefined value metrics. These price levels act as thresholds that determine the intensity and method of RBS intervention according to market conditions.

The Wall prices are set by applying a fixed percentage to key value metrics (DFV, IV). In contrast, the boundaries of the Cushion price are dynamically adjusted to reflect the project's credibility level ($DF_{R,t}$). In the early stages of the project, when credibility is low, the Cushion is set close to the Wall price to respond sensitively to market fluctuations. However, as the project progresses and credibility increases, the Cushion expands towards other key value metrics (e.g., FV or DIV for the lower cushion, and FV or DIV for the upper cushion), widening its operational range. This gradually narrows the range of autonomous price determination, causing it to converge towards the face value.

1.  **Lower Wall Price ($Price_{LW}$)**: A strong support line to prevent the KASH price from falling below this level.
        $$
        Price_{LW} = DFV_t \times (1 - \text{Margin}_{LW})
        $$
        *   $DFV_t$: Discounted Face Value at the given time.
        *   $\text{Margin}_{LW}$: Margin rate for setting the lower wall price.

2.  **Lower Cushion Price ($Price_{LC}$)**: The price level at which the protocol begins to gradually mitigate downward pressure. It is close to the Wall when credibility is low but is adjusted upward towards a target value of $FV_t$ or $DIV_t$ as credibility increases.
        $$
        Price_{LC} = Price_{LW} + ( (\min(FV_t, DIV_t) - Price_{LW}) \times DF_{R,t}^{q_{LC}} )
        $$
        *   $DF_{R,t}$: Risk Discount Factor at the given time.
        *   $q_{LC}$: Sensitivity coefficient for adjusting the lower cushion range based on credibility changes.
    *   **Explanation**: When $DF_{R,t}$ is low, $Price_{LC} \approx Price_{LW}$ (narrow cushion). As $DF_{R,t}$ approaches 1, $Price_{LC}$ gets closer to $\min(FV_t, DIV_t)$ (wide cushion). This means that as credibility gets higher, the protocol will initiate passive intervention even if the KASH price only drops to the level of $FV_t$ or $DIV_t$.

3.  **Upper Wall Price ($Price_{UW}$)**: A strong resistance line to curb excessive increases in the KASH price beyond this level.
        $$
        Price_{UW} = IV_t \times (1 + \text{Margin}_{UW})
        $$
        *   $IV_t$: Intrinsic Value assessed at the given time.
        *   $\text{Margin}_{UW}$: Margin rate for setting the upper wall price.

4.  **Upper Cushion Price ($Price_{UC}$)**: The price level at which the protocol begins to gradually mitigate upward pressure. It is close to the Wall when credibility is low but is adjusted downward towards a target value of $FV_t$ or $DIV_t$ as credibility increases.
        $$
        Price_{UC} = Price_{UW} - ( (Price_{UW} - \max(FV_t, DIV_t)) \times DF_{R,t}^{q_{UC}} )
        $$
        *   $q_{UC}$: Sensitivity coefficient for adjusting the upper cushion range based on credibility changes.
    *   **Explanation**: When $DF_{R,t}$ is low, $Price_{UC} \approx Price_{UW}$ (narrow cushion). As $DF_{R,t}$ approaches 1, $Price_{UC}$ gets closer to $\max(FV_t, DIV_t)$ (wide cushion). This means that as credibility gets higher, the protocol will initiate passive intervention even if the KASH price only rises to the level of $FV_t$ or $DIV_t$.

All $\text{Margin}$ and $q$ coefficients can be adjusted through protocol governance according to market conditions and project maturity.

---

### Example Graph

The following is an example graph showing the operational range of the RBS under the current settings, overlaid on the previous Valuation graph.

![KASH RBS Graph](/img/kash_valuation_main_with_rbs.png)

+ This is based on the following parameters: $Margin_{LW}$ : 5%, $Margin_{UW}$ : 5%, $q_{LC}, q_{UC}$ : 1.0.