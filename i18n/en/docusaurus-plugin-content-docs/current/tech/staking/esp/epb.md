---
id: epb
sidebar_position: 2
---

# Early Participant Bonus

The Early Staking Pool uses mechanisms such as EPB/DCR to provide additional returns for participating in the sales.

---

### Early Participant Bonus

The protocol grants each sales participant a value called EPB based on the timing of their participation (by sales volume). The earlier a user participates (i.e., the lower the sales volume), the higher the EPB they receive, corresponding to the higher risk they undertook.

+ $EPB$, Early Participant Bonus: A bonus multiplier based on the timing of sales participation.
    $$
    EPB_{q} = A / (q + k)^2 + C
    $$
    + $q$: The progress of the sale (sales volume, in KASH).
    + $k$[^DCR_k], $A$[^DCR_A], $C$[^DCR_C]: Constants that form the EPB curve, satisfying the conditions below:
        + Monotonically decreasing: $q_1<q_2 \implies EPB_{q1} \ge EPB_{q2}$
        + Target multiplier: $EPB_0 = a$, $EPB_{5m} = b + \epsilon$
            + $a$: Maximum multiplier at the beginning of the sale; 25 for the Early Staking Pool.
            + $b$: Minimum multiplier at the end of the sale; 4 for the Early Staking Pool.
        + Definite integral: $\int_{0}^{5m} EPB_q \, dq = c - \epsilon$
            + $c$: Total shares to be issued through the sale; 25m for the Early Staking Pool.
        + Decimal error: $0< \epsilon ≪ 1$
    
+ $E(EPB)$: The user's effective final EPB, considering their participation timing and purchase amount.
    $$
    E(EPB) = \frac{1}{q_a - q_b} \int_{q_b}^{q_a} EPB_q \, dq
    $$
    + $q_b$: The sales volume before the user purchased tokens.
    + $q_a$: The sales volume after the user purchased tokens.
    + Within this document, references to a user's EPB or the (sales volume-weighted, integral) average EPB refer to this $E(EPB)$.

This represents the target rate of return that the protocol aims to provide to participants, which is practically realized by issuing virtual shares using mechanisms like the DCR described below.

---

### Debt Creation Right

Sales participants receive a Debt Creation Right (DCR) in proportion to their purchase amount and EPB. This right can be exercised when staking tokens, granting the user virtual shares created from "debt." This has the effect of increasing their share percentage of the rewards.

+ $DCR$, Debt Creation Right: The right to create debt.
    $$
    DCR_q := EPB_q - 1
    $$
    + DCR is an additional mechanism for reward earnings. Since participants will also receive rewards on their principal deposit, the DCR curve is defined as EPB-1 to more easily align with the target returns.
    $$
    DCR_{earn} = \int_{q_b}^{q_a} (EPB_q - 1) \, dq = (E(EPB) - 1) \times Amount_{buy}
    $$
    + $Amount_{buy}$ = $q_a - q_b$: The number of tokens purchased by the sales participant.
    + $DCR_{earn}$: The amount of DCR a sales participant receives for their token purchase.

<!-- 📌 Participants in additional sales may not have the opportunity to exercise their DCR in the current Early Staking Pool. Please be sure to refer to the Priority Reservation section below. -->

---

### EPB / DCR Graph

The following graph visualizes the EPB and the corresponding "cumulative" DCR based on the sales volume (q) under the current settings for the Early Staking Pool.

![KASH EPB Graph](/img/kash_staking_epb.png)

+ q is in units of 1,000,000 KASH.

---

[^DCR_k]: Corresponds to the DCR_k [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^DCR_A]: Corresponds to the DCR_A [parameter in the smart contract configuration](/tech/deployment/config-initial).
[^DCR_C]: Corresponds to the DCR_C [parameter in the smart contract configuration](/tech/deployment/config-initial).