---
id: vshare
sidebar_position: 2
---

# Virtual Share

The DCR issued based on EPB is realized as actual rewards through the concept of a Virtual Share.

---

### Virtual Share

When staking, users can spend their DCR to receive "virtual shares," converted at a value of 1 DCR per 1 KASH. An equivalent amount of debt is created for the value of the DCR used, which must be repaid when later unstaking the shares.

+ **Virtual Share**: Additional shares issued by using DCR.
    $$
    Share_{virtual} = DCR_{used} \, / \, Price_{share}
    $$
    $$
    Debt_{new} = Debt_{old} + DCR_{used}
    $$
    
The purpose of virtual shares is to allow users to profit from the increase in share value as rewards accumulate. In other words, it can be understood as receiving interest as if one had staked a larger amount and thus held more shares.

+ **Weighted Share**: The total share including virtual shares. In the Early Staking Pool, this weighted share is the basis for reward distribution.
    $$
    Share_{weighted} = Share_{principle} + Share_{virtual}
    $$
    + $Share_{principle}$: The principal shares issued from the staked principal amount.

---

### Max Leverage

Users cannot exercise all of their issued DCR without limits. A maximum debt ratio (leverage) is imposed, proportional to the amount of KASH purchased and the DCR issued. This is a mechanism to prevent unfair reward acquisition, such as staking a very small amount of KASH while exercising a large amount of DCR.

+ **User Leverage**: How much larger a user's total shares (stake size) are compared to their principal shares.
    $$
    Leverage_{user} = \frac{Share_{weighted}}{Share_{principle}}
    $$

+ **User Max Leverage**: The maximum leverage a user can achieve through DCR.
    $$
    MaxLeverage_{user} = \frac{\sum{DCR_{earned}}}{\sum{Amount_{bought}}} + 1
    $$
    + $\sum{DCR_{earned}}$: The total DCR received by the user.
    + $\sum{Amount_{bought}}$: The total KASH purchased by the user.

+ **Exercisable DCR**: The amount of DCR that can be exercised, considering leverage.
    $$
    Share_{virtual, limit} = (MaxLeverage_{user} - 1) \times (Share_{principle} + \frac{Amount_{deposit}}{Price_{share}})
    $$
    + $Amount_{deposit}$: (Optional) The amount to be staked along with exercising DCR.
    + $Share_{virtual, limit}$: The limit on virtual shares, proportional to the principal shares and max leverage.
    $$
    DCR_{exercisable} = 
    \begin{cases}
        0 & (Share_{virtual, limit} <= Share_{virtual}) \\
        (Share_{virtual, limit} - Share_{virtual}) \times Price_{share}  & (else)
    \end{cases}
    $$

Generally, without needing to understand all these formulas, a user can exercise all the DCR issued from a purchase if they stake all the tokens they acquired from that same purchase.

---

### Formula Modification

The introduction of the virtual share concept in the Early Staking Pool results in the following differences:

+ In several places where "Share" would be used in a typical staking pool, "Weighted Share" is used instead, particularly in reward calculations.
+ The staking pool's balance is assumed to include the total debt to be collected from users.

Applying this, a few formulas are modified as follows:

+ **Share Price**: The value represented by a single share. When entering or exiting, KASH is exchanged based on this price.
    $$
    Price_{share} = \frac{
        \sum Principle_{\text{All users}} + 
        \sum Debt_{\text{All users}} + 
        \sum Reward_{\text{All epochs}}
    }{\sum\limits_{user \in U_{pool}} Shares_{weighted, user}}
    $$
    + $\sum Principle_{\text{All users}}$: The total principal amount staked by all users.
    + $\sum Debt_{\text{All users}}$: The total debt of all staked users.
    + $\sum Reward_{\text{All epochs}}$: The total rewards realized in the staking pool.
    + $\sum\limits_{user \in U_{pool}} Shares_{weighted, user}$: The total weighted shares of all staked users.

+ **Withdrawable Balance**: When withdrawing, shares are burned and converted to KASH. The total withdrawable amount is the value of the shares minus any outstanding debt.
    $$
    Amount_{Withdrawable} = Share_{weighted} \times Price_{share} - Debt
    $$
    + For a partial withdrawal, the user must maintain their current leverage ratio. Therefore, principal shares and virtual shares must be burned in the same proportion as their current holdings, and debt must also be repaid at the same rate.
    $$
    Rate_{burn} = \frac{Amount_{withdraw}}{(Share_{weighted} \times Price_{share}) - Debt_{current}}
    $$
    $$
    Share_{burn} = Amount_{withdraw} \times  \frac{Share_{weighted}}{Share_{weighted} \times Price_{share} - Debt_{current}} = Share_{weighted} * Rate_{burn}
    $$
    + $Amount_{withdraw}$: The amount the user wishes to withdraw.
    + $Share_{burn}$: The number of shares to be burned to withdraw the specified amount.
    + $Debt_{burn}$: The amount of debt to be repaid when burning the corresponding shares.