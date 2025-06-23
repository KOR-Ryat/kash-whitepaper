---
id: intro
sidebar_position: 0
---

# Introduction of RBS

As a key mechanism for the sustainable value stability of the KASH ecosystem, the Range Bound System (RBS) is designed to ensure that the token's market price aligns with its intrinsic value. The RBS aims to mitigate excessive price volatility by comprehensively evaluating the value of KASH token's underlying asset, physical gold (RWA), and the project's progress to establish an appropriate value range for the token.

---

### Olympus DAO RBS

KASH's RBS was inspired by the Olympus DAO's RBS model and borrows its basic concepts.

+ **Price Walls**: As the price moves away from the central price, there are upper and lower boundaries. Active intervention occurs to prevent the price from moving beyond these walls.
+ **Cushion Zone**: Before the market price reaches a Wall, the system attempts passive intervention to soften the impact.
+ **Bond Market**: These protocol interventions are carried out indirectly by opening temporary bond markets to buy or sell KASH.

---

### Value-Driven Price

The RBS is more than just a stabilization mechanism that mitigates rapid price fluctuations; it pursues dynamic price stabilization based on KASH's fundamental value. To achieve this, it calculates and utilizes the following key project value metrics:

1.  **Face Value (FV)**: The future expected value of the contracts deposited in the project's reserve vault, divided by the total KASH supply. This represents the token's most basic collateral value.
2.  **Intrinsic Value (IV)**: This value adds expected future value (e.g., anticipated staking rewards) to the Face Value (FV). It represents the total potential value that a holder of one KASH token can obtain.
3.  **Discounted FV (DFV) & Discounted IV (DIV)**: When evaluating the aforementioned future values (FV, IV) from a present-day perspective, they are discounted to account for the uncertainty of achieving project goals and the time value of money (risk-free interest rate). The resulting DFV and DIV serve as more rational valuation standards for the KASH token at the present time.

The RBS uses these value metrics as crucial benchmarks to set the price stabilization range and determine whether to intervene. As the project progresses and achieves major milestones (e.g., exploration completion, start of mining), the risk discount rate gradually decreases, causing the DFV and DIV to eventually converge towards the FV and IV.

---

The following sections will provide a detailed explanation of the RBS's core components: the valuation model and the market stabilization mechanism.