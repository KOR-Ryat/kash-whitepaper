---
id: kash-value
title: 2. KASH Intrinsic Value
description: KASH Value Calculation Mechanism and Change Predictions
sidebar_position: 2
---

### KASH Value Calculation Mechanism

KASH's intrinsic value is calculated based on the total assets in the reserve pool (initially vRWA, later USDT and RWA) relative to the total supply.

:::info
KASH value = (vRWA current value + Total USDT/RWA in reserve) / Total KASH supply
:::

- **vRWA**: Current gold market price evaluation of remaining unliquidated vRWA quantity
- **USDT**: Gold price-based assets converted from liquidated vRWA

This structure is designed to closely link KASH holders' rights to the project's physical value.

### Relationship with vRWA and Liquidation Structure

KASH secures its collateral base by initially depositing vRWA(Gold) in the reserve pool. Subsequently, vRWA will be liquidated in equal monthly installments over 36 months starting from 2027 when gold production begins, with USDT equivalent to the liquidated gold value being incorporated into the reserve pool.

- **vRWA Burning**: Corresponding quantity burned at each liquidation point
- **Enhancement of KASH Holders' Rights**: Structure where KASH value increases due to USDT increase in reserve pool

This gradual liquidation structure increases KASH's intrinsic value over time, providing long-term value to holders.

### KASH Intrinsic Value Changes According to Gold Price Scenarios

Gold production and liquidation will proceed for 36 months from January 2027 to January 2030. Based on this, KASH value variations can be predicted by scenario as follows:

| **Liquidation Completion Point** | **Neutral Scenario** | **Aggressive Scenario** |
| :---: | :---: | :---: |
| **2025.09 (Funding Start)** | $1.02 | $1.02 |
| **2027.01 (Liquidation Start)** | $1.04 |$1.06 |
| **2028.01** | $1.28 | $1.52 |
| **2029.01** |$1.38 | $1.67 |
| **2029.12 (Liquidation Complete)** | $1.41 | $1.72 |

#### KASH Intrinsic Value Prediction Graph

<img src="/img/kash_intrinsic_value.png" alt="KASH Reserve Token Structure" width="700"/>

KASH intrinsic value gradually increases over time, with higher gold prices leading to larger increases. While price volatility exists, even excluding conservative scenarios, a minimum price increase of 10% can be expected.

:::note
Price prediction basis: Referenced forecasts from Traders Union, Coin Price Forecast, InvestingHaven, JP Morgan, Incrementum, etc.
:::

<!-- ---
id: kash-value
title: 2. KASH 내재 가치
description: KASH 가치 산정 메커니즘 및 변화 예측
sidebar_position: 2
---

### KASH 가치 산정 메커니즘

KASH의 내재 가치는 리저브풀 내의 자산 총액(초기에는 vRWA, 이후 USDT 및 RWA) 대비 전체 발행량으로 산정됩니다.

:::info
KASH 가치 = (vRWA 현재가치 + 리저브 내 USDT/RWA 총액) / KASH 총발행량
:::

- **vRWA**: 청산이 완료되지 않은 vRWA 잔여 수량을 현재 금 시세로 평가
- **USDT**: 청산 완료된 vRWA로 전환된 금 시세 기반 자산

이 구조는 KASH 보유자의 권리가 프로젝트 실물가치에 밀접하게 연결되도록 설계되었습니다.

### vRWA와의 관계 및 청산 구조

KASH는 발행 초기 vRWA(Gold)를 리저브풀에 예치함으로써 담보 기반을 확보합니다. 이후 vRWA는 금 생산이 시작되는 2027년부터 36개월간 매월 균등 청산되며, 청산된 금 가치만큼의 USDT가 리저브풀로 편입됩니다.

- **vRWA의 소각**: 매 청산 시점마다 해당 수량 소각
- **KASH 보유자의 권리 강화**: 리저브풀 내 USDT 증가로 인해 KASH 가치가 상승하는 구조

이러한 점진적 청산 구조는 KASH의 내재 가치를 시간에 따라 상승시키며, 보유자에게 장기적 가치를 제공합니다.

### 금 시세 시나리오에 따른 KASH 내재 가치 변화

2027년 1월부터 2030년 1월까지 36개월 동안 금 생산 및 청산이 진행될 예정입니다. 이에 따라 KASH 가치의 시나리오별 변동을 아래와 같이 예측할 수 있습니다:

| **청산 완료 시점** |	**중립적 시나리오** | **공격적 시나리오** |
| :---: | :---: | :---: |
| **2025.09 (펀딩 시작)** | $1.02 | $1.02 |
| **2027.01 (청산 시작)** | $1.04 |$1.06 |
| **2028.01** | $1.28 | $1.52 |
| **2029.01** |$1.38 | $1.67 |
| **2029.12 (청산 완료)** | $1.41 | $1.72 |

#### KASH 내재 가치 변동 예측 그래프

<img src="/img/kash_intrinsic_value.png" alt="KASH Reserve Token Structure" width="700"/>

KASH 내재가치는 시간이 흐름에 따라 점진적으로 상승하며, 금 가격이 높을수록 상승폭도 커집니다. 시세의 변동성은 있지만, 보수적 시나리오는 제외했지만 이 경우에도 최소한 10%의 가격 상승은 예상할 수 있습니다.

:::note
시세 예측 기반: Traders Union, Coin Price Forecast, InvestingHaven, JP모건, Incrementum 등의 전망치를 참고
::: -->