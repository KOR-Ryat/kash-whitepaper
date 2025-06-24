---
id: rwa-structure
title: 2. KASH Project RWA Structure
description: RWA & vRWA Structure and Significance
sidebar_position: 2
---

### Definition and Structure of Gold RWA

**RWA(Gold)** is a **physical asset-backed RWA token** issued against gold that has been produced and is in storage.

It will be fully launched from Phase 2, and will be directly incorporated as a **collateral asset in the KASH Reserve Pool** to support KASH token's value stability. Subsequently, it can be utilized in various DeFi products or used for direct investment purposes.

#### Key Properties

| **Item** | **Description** |
| --- | --- |
| **Issuance Timing** | After physical gold production and refining completion (Phase 2 onwards) |
| **Collateral Base** | Physical gold (linked to on-chain PoR) |
| **Deposit Location** | ①**RWA(Gold) tokens for KASH collateral are deposited in the on-chain smart contract-based KASH Reserve Pool**, |
|  | ② The corresponding**physical gold is physically stored through third-party vaults, warehouses, or trust institutions**. |
|  | ③ These physical holdings are**periodically linked to on-chain through the PoR(Proof of Reserve)**system. |
| **Purpose** | KASH issuance collateral, future foundation asset for expandable financial structures such as lending |
| **Standard** | ERC-3643 permission-based RWA token standard |

:::tip[Implementation of PoR (Proof of Reserve) System]
- Physical gold holdings are regularly verified through external institutions or on-chain oracles
- RWA issuance volume and reserve pool status are linked based on PoR data
- Planning to connect with vaults, warehouses, and guarantee institutions
:::

### Definition and Structure of Gold vRWA (Voucher RWA)

**vRWA (Voucher RWA)** is an **RWA token in the form of a claim right** to either **physical asset-backed RWA** or **virtual assets** of equivalent value (e.g., stablecoins, ETH, or network tokens like KAIA). It represents a future claim right rather than a current one, and is settled through periodic liquidation points until maturity.

In Phase 1, **vRWA(Gold)** based on **gold** will be issued, which will be **partially liquidated at regular intervals after gold production begins**, and must be **fully settled** by the maturity point of 3 years after gold production.

:::danger[vRWA Liquidation Plan]    
The vRWA(Gold) liquidation plan is based on the Indonesia Buru gold mine development plan, and 35% of production will be prioritized for allocation periodically after development begins.
For detailed liquidation plans, please refer to the [Mining Plan](../gold_mining/mining-economy.md) section.
:::

#### Key Properties

| **Item** | **Description** |
| --- | --- |
| **Issuance Timing** | Before physical gold production (early Phase 1) |
| **Underlying Asset** | Future gold production or virtual assets of equivalent value |
| **Liquidation Start** | After gold production begins (expected: about 1 year after Phase 1 start) |
| **Liquidation Method** | During Phase 1, liquidation through virtual assets without using gold RWA |
| **Maturity** | Yes (full liquidation within 3 years after liquidation begins) |
| **Purpose** | KASH Reserve Pool value formation, initial fundraising and rewards |
| **Standard** | ERC-3643 based permission management token |
| **Traceability** | Full transparency of on-chain liquidation records and settlement details |

### **📌 Risk and Reward Structure**

vRWA is structured as a **forward claim right on physical gold to be produced**,
and inherently carries **incomplete collateral risk** as the underlying asset has not yet been realized when value is formed.

While **KASH issued on this structure uses vRWA as collateral, it does not have complete intrinsic value before physical holdings are secured**.

Consequently, KASH holders and staking participants are provided with **high interest rate rewards**,
which functions as a **premium reward mechanism** in return for structurally bearing vRWA risk.

:::note
This reward structure is explained in detail in the [Early Investor Rewards](../KASH-mechanism/staking-&-reward.md) section.
:::

### **🛡️ Liquidation Guarantee and Insurance Mechanism**

vRWA must be converted to physical gold (RWA) or virtual assets of equal value in the KASH Reserve Pool according to the set liquidation cycle. However, in the early stages of the project, liquidation may become impossible due to **delays in gold production schedules, logistics disruptions, or regulatory factors**.

To address such situations, **10% of total KASH issuance is secured as an 'Insurance' pool** in advance, which operates as follows:

- If physical or virtual asset payments become impossible at a specific liquidation point,
  **liquidation is substituted by simultaneously burning equivalent amounts of vRWA and KASH from the insurance pool**.
- Although this results in **assets within the reserve pool decreasing by the liquidation amount**,
  **the collateral ratio (LTV) is maintained as KASH is burned simultaneously**.
- This serves as a mechanism to **preserve system value balance and maintain investor trust even in liquidation delay situations**.
- The insurance volume **provides flexibility to the project schedule** and acts as a safety mechanism buying time for physical asset securing.
- **If delays persist even after the insurance pool is fully depleted**,
  **team allocation (10%) will also be burned additionally to guarantee vRWA liquidation until the end**.

:::note
This structure is a crucial complementary mechanism to **buffer execution risks inherently accompanying the time-based liquidation model** of vRWA,
and maintain the system's overall **reliability and sustainability**.
:::

### Strategic Significance of vRWA and RWA Expandability

- **vRWA serves as a strategic bridge role enhancing structural flexibility and feasibility**→ Enables liquidity and ecosystem reward design while securing physical asset-based trust
- **RWA(Gold) transitions into a regular constituent asset of the reserve pool** and subsequently functions as a core component for expanding the physical asset-based DeFi ecosystem
- The vRWA structure can be similarly expanded to **other physical assets (RWA-Silver, RWA-Copper, etc.)** in the future

:::tip[Summary]
**vRWA** = Future claim right-based RWA for physical asset-based RWA or virtual assets of equivalent value

**RWA(Gold)** = Physical asset-based RWA issued against physical gold, core asset of KASH Reserve Pool

KASH issued based on vRWA starts from an **incomplete collateral structure**, supported by design where **risk premium is reflected in staking yields**.

This dual structure is KASH project's practical strategy to **simultaneously secure initial liquidity and physical asset-based reliability**,
functioning as a **phased evolution model** for the RWA token ecosystem.
:::

<!-- ---
id: rwa-structure
title: 2. KASH 프로젝트 RWA 구조
description: RWA & vRWA 구조 및 의의
sidebar_position: 2
---

### Gold RWA의 정의 및 구조

**RWA(Gold)** 는 실제로 생산되어 보관 중인 금을 담보로 발행되는 **현물 기반 RWA 토큰**입니다.

2기부터 본격적으로 발행되며, **KASH 리저브풀의 담보 자산**으로 직접 편입되어 KASH 토큰의 가치 안정성을 뒷받침합니다. 그 이후에는 다양한 디파이 상품에 활용되거나 직접적인 투자용도로 사용될 수 있습니다.

#### **주요 속성**

| **항목** | **설명** |
| --- | --- |
| **발행 시점** | 실물 금 생산 및 정제 완료 후 (2기 이후) |
| **담보 기반** | 실물 금 (온체인 PoR 연계) |
| **예치 위치** | ① KASH 담보용 **RWA(Gold) 토큰은 온체인 스마트컨트랙트 기반의 KASH 리저브풀에 예치**되며, |
|  | ② 그에 대응하는 **실물 금은 제3자 금고, 창고, 또는 신탁기관을 통해 물리적으로 보관**됩니다. |
|  | ③ 이 실물 보유 내역은 **PoR(Proof of Reserve)** 시스템을 통해 주기적으로 온체인에 연동됩니다. |
| **용도** | KASH 발행 담보, 추후 대출 등 확장형 금융 구조 기반 자산 |
| **규격** | ERC-3643 권한 기반 RWA 토큰 표준 |

:::tip[PoR (Proof of Reserve) 체계 적용]    
- 실물 금 보유량은 외부 기관 또는 온체인 오라클을 통해 정기적으로 검증  
- PoR 데이터를 바탕으로 RWA 발행량과 리저브풀 상태를 연동  
- 금고·창고·보증기관 연계 예정
:::

### Gold vRWA (Voucher RWA) 정의 및 구조

**vRWA (Voucher RWA)** 는 **실물 기반 RWA** 또는 그에 상응하는 가치의 **가상자산**(예: 스테이블코인, ETH 혹은 KAIA 같은 네트워크토큰)에 대한 **청구권 형태의 RWA 토큰**입니다. 현재가 아닌 미래 시점 청구권이며 만기까지 주기적 청산 시점에 정산이 실행되어 치환됩니다.

1기에서는 **금**을 기초로 하는 **vRWA(Gold)** 가 발행되며, **금 생산이 시작된 이후 일정 주기로 분할 청산**되고, 금 생산 이후 3년 만기 시점까지 **전량 정산**되어야 합니다.

:::danger[vRWA 청산 계획]    
vRWA(Gold) 청산 계획은 인도네시아 부루 금광 개발 계획에 의하며 개발 시작 후 주기적으로 생산량의 35%를 우선적으로 할당하도록 계약됩니다.
구체적인 청산 계획은 [채광 계획](../gold_mining/mining-economy.md) 섹션을 참고하세요.
:::

#### **주요 속성**

| **항목** | **설명** |
| --- | --- |
| **발행 시점** | 실물 금 생산 이전 (1기 초반) |
| **기초 자산** | 향후 생산될 금 또는 동일가치의 가상자산 |
| **청산 개시** | 금 생산 개시 시점 이후 (예상: 1기 개시 후 약 1년 시점) |
| **청산 방식** | 1기 동안은 금 RWA를 사용하지 않고, 가상자산으로 청산 |
| **만기** | 존재 (청산 후 3년까지 전량 청산) |
| **용도** | KASH 리저브풀 가치 형성, 초기 자금 조달 및 보상 |
| **규격** | ERC-3643 기반 권한관리형 토큰 |
| **추적성** | 온체인 청산 기록 및 정산 내역 전부 투명화 |

### **📌 리스크와 보상 구조**

vRWA는 생산될 실물 금에 대한 **선도적 청구권을 현재화한 구조**로,
기초 자산이 아직 실현되지 않은 상태에서 가치가 형성되는 특성상 **불완전 담보 리스크**를 내포하고 있습니다.

이러한 구조 위에서 발행되는 **KASH는 vRWA를 담보로 하지만, 실물 보유 이전에는 완전한 내재 가치를 갖지 않습니다**.

이에 따라 KASH 보유자 및 스테이킹 참여자에게는 **높은 이자율의 보상이 제공되며**,
이는 구조적으로 vRWA의 리스크를 감수하는 대가로서 작동하는 **프리미엄 보상 메커니즘**입니다.

:::note
해당 보상 구조는 [초기 투자자 보상](../KASH-mechanism/staking-&-reward.md) 섹션에서 상세히 설명됩니다.
:::

### **🛡️ 청산 보증 및 보험(Insurance) 메커니즘**

vRWA는 정해진 청산 주기에 따라 일정량이 KASH 리저브풀에서 실물 금(RWA) 또는
동등한 가치의 가산자산으로 전환되어야 합니다. 그러나 프로젝트 초기에는 **금 생산 일정의 지연, 물류 차질, 제도적 요인 등으로** 청산이 불가한 상황이 발생할 수 있습니다.

이러한 상황에 대응하기 위해 전체 KASH 발행량의 **10%는 ‘보험(Insurance)’ 풀로 사전 확보**되며, 다음과 같이 작동합니다:

- 특정 청산 시점에 실물 또는 가상자산 지급이 불가능할 경우,
    **보험 풀에서 해당 청산 분량만큼의 vRWA와 KASH를 동시에 소각함으로써 청산을 대체**합니다.

- 이로 인해 **리저브풀 내 자산은 청산량만큼 감소하지만**,
    **KASH가 동시에 소각되기 때문에 담보비율(LTV)은 유지**됩니다.

- 이는 **청산 지연 상황에서도 시스템의 가치 균형을 보전하고, 투자자 신뢰를 유지**하는 장치입니다.

- 보험 물량은 **프로젝트 일정에 유연성을 부여하며**, 실물 확보를 위한 시간을 벌어주는 안전장치 역할을 합니다.

- **보험 풀이 전부 소진된 상태에서도 일정 지연이 지속될 경우**,
    **팀 할당 물량(10%)도 추가로 소각하여 vRWA 청산을 끝까지 보장**하는 메커니즘이 적용됩니다.
    
:::note
이 구조는 vRWA의 **시간 기반 청산 모델에 필연적으로 수반되는 실행 리스크를 완충**하고,
시스템 전체의 **신뢰성과 지속 가능성**을 유지하기 위한 핵심적 보완 장치입니다.
:::

### vRWA의 전략적 의의 및 RWA의 확장성

- **vRWA는 구조적 유연성과 실행 가능성을 높이는 전략적 가교 역할**
    
    → 실물 기반의 신뢰를 확보하는 동안 유동성 및 생태계 보상을 설계 가능
    
- **RWA(Gold)는 리저브풀의 정규 구성 자산으로 전환되며**, 이후 실물 자산 기반의 DeFi 생태계 확장의 핵심 구성 요소로 작동
- vRWA 구조는 향후 **다른 실물 자산(RWA-Silver, RWA-Copper 등)** 에도 동일하게 확장 가능

:::tip[요약]
**vRWA** = 실물 기반 RWA 또는 동일가치 가상자산에 대한 미래 청구권 기반 RWA

**RWA(Gold)** = 실물 금을 담보로 발행된 현물 기반 RWA, KASH 리저브풀의 핵심 자산 

vRWA 기반으로 발행되는 KASH는 **불완전 담보 구조**에서 시작하며, 이에 따른 **리스크 프리미엄이 스테이킹 수익률로 반영**되는 설계가 뒷받침됩니다.

이 이중 구조는 KASH 프로젝트가 **초기 유동성과 실물 기반 신뢰성을 동시에 확보**하기 위한 실천적 전략이며,
RWA 토큰 생태계의 **단계별 진화 모델**로서 기능합니다.
::: -->