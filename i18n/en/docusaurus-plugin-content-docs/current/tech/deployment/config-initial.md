---
id: config-initial
sidebar_position: 1
---

# Initial Configuration

This guide lists the parameters planned for the initial project setup, organized by the smart contract where they are used.

---

### Index

+ **Contract Name**
    + The name of the contract used in technical whitepapers and other documents.
    + If there is `(content)` enclosed in parentheses, it means that multiple contracts of that type are deployed for different purposes, and the value shown corresponds to the contract for the specified 'content'.

+ **Variable Name**
    + The name of the variable where each value is stored in the smart contract.
    + For mappings or arrays, the variable name and description are given first. In the subsequent rows under the 'Variable Name' column, each key is indicated as `-[key]`.
    + When a smart contract address is used as a key in a mapping, the identifier for that contract is used instead. For example, `-[Early]` represents the value for the key that is the address of the Early Staking Pool.

+ **Nominal Value**
    + A value adjusted for easier understanding of its intent.
    + For decimal values, this is the value before being multiplied by its unit precision.
    + For timestamps, this is a value represented as an easy-to-understand date or time.

+ **Remarks**
    + Generally, a brief description of the variable.
    + For mappings using an identifier, this is a description of the identifier.

+ **Unit**
    + Indicates the unit of the value.
    + For decimals, this indicates the precision for converting to a fixed-point number.

+ **Actual Value**
    + The raw value that is actually stored in the contract.

---

### KASH Token

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| SMART_CONTRACT_VERSION | 1.0 | Smart contract version | 10**2 | 100 |
| decimals | 18 | The decimal precision of the token |  | 18 |
| totalSupply | 100m | Total supply of KASH tokens | 10**18 | 100000000000000000000000000 |

### DCR Strategy (Early)

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| DCR_K | 0.5409.. | k value used in DCR calculation | 10**18 | 540906246443305252 |
| DCR_A | 6.1603.. | A value used in DCR calculation | 10**18 | 6160392620707085906 |
| DCR_C | 3.9445.. | C value used in DCR calculation | 10**18 | 3944556263515440025 |

### Staking Reward Distributor

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| POOL_TOTAL_REWARD |  | Total tokens to be distributed to each staking pool (Total 50m for Phase 1) | 10**18 |  |
| -[Early] | 30m | - Early Staking Pool (Phase 1 reward pool) |  | 30000000000000000000000000 |

### Staking Reward Strategy (Early)

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| STAKING_EPOCH_START | | Start time of the first epoch | Timestamp | TBD |
| STAKING_EPOCH_DURATION | 30 days | Duration of one epoch | Second | 2592000 |
| STAKING_TOTAL_DURATION | 36 Epochs | Total period during which rewards are distributed | Second | 93312000 |
| STAKING_REWARD_GROWTH | 0.05 | Per-epoch reward growth rate (g) | 10**18 | 50000000000000000 |
| EPOCH_REWARD_BASE | ~313,034 | Reward amount for the first epoch | 10**18 | 313034351368942330000000 |

### Staking Pool (Early)

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| STAKING_POOL_OPEN | | Time when deposits become available | Timestamp | TBD |
| SHARE_LIMIT | 30m | Total issuable amount of weighted shares | 10**18 | 30000000000000000000000000 |

### Parameter Store

|Variable Name|Nominal Value|Remarks|Unit|Actual Value|
|---|---|---|---|---|
| RISK_FREE_RATE | 0.03 | Risk-free annual interest rate (for DF_T calculation) | 10**18 | 30000000000000000 |
| BASE_TRUST | 0.2 | Minimum project trust level (for DF_R calculation) | 10**18 | 200000000000000000 |
| SENSITIVITY_P | 1.0 | Risk discount factor sensitivity (p) (for DF_R calculation) | 10**18 | 1000000000000000000 |
| MARGIN_LOWER_WALL | 0.05 | Lower Wall (LW) price margin rate | 10**18 | 50000000000000000 |
| MARGIN_UPPER_WALL | 0.05 | Upper Wall (UW) price margin rate | 10**18 | 50000000000000000 |
| SENSITIVITY_QLC | 1.0 | Lower Cushion (LC) sensitivity coefficient | 10**18 | 1000000000000000000 |
| SENSITIVITY_QUC | 1.0 | Upper Cushion (UC) sensitivity coefficient | 10**18 | 1000000000000000000 |