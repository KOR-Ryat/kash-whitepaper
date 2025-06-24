---
id: introduction
title: 1. KASH Project Overview
description: Underlying Assets and Purpose of the KASH Project
sidebar_position: 1
---

:::info
The KASH Project aims to pioneer the RWA market and revitalize digital finance by creating RWA based on real-world assets like gold, and digital stable assets built upon these RWAs.

The KASH Foundation will develop the foundational Indonesian gold mine and prepare and execute systematic steps for building an RWA-based system.
:::

### 🌐 Project Purpose and Structure Overview

The KASH Project aims to **build a new digital financial system based on real-world assets**.

**Phase 1 has been designed with two core objectives**:

1. **Funding and development of the Buru Island gold mine in Indonesia**
2. **Experimentation and expansion of an on-chain financial ecosystem centered around RWA-based digital assets (KASH)**

To achieve this, the KASH Project adopts the following mechanisms:

- Based on **physical gold** to be produced through mine development
- **vRWA(Gold)**: Tokenization of future gold claims
- **KASH**: A reserve-based digital token issued against vRWA collateral
- **DeFi Utility**: Staking, liquidity, stabilization, and collateral utilization structures based on KASH

Through this structure, the KASH Project ultimately aims to **design a sustainable foundation for digital assets**.

### 🪙 Project's Core Asset: Buru Gold Mine in Indonesia

The KASH Project begins with **an actual gold mine development project on Buru Island, Indonesia** as its foundational asset.

This is not merely a concept, but **a real revenue-generating project based on geological exploration and mining potential**.

The produced gold will later be tokenized **as RWA(Gold)** on-chain,

connecting this asset to KASH's collateral structure and DeFi ecosystem.

### 🌱 Practical Approach in Phase 1

**Gold-based RWA (Real World Asset) structures are emerging as an innovative alternative to address the high barriers to entry, low accessibility, and liquidity constraints of traditional gold investment markets**.

Investors can participate in gold investment with small amounts, gain flexibility through 24-hour trading, and create added value by connecting gold assets to digital finance.

However, for these **benefits to be realized**, challenges remain, including regulatory clarity, building trustworthy infrastructure, and establishing sufficient market creation.

The KASH Project does not handle direct gold RWAs in Phase 1 for several reasons:
- Lack of regulatory framework for directly accessible RWAs
- RWA's primary function; stepping stone as collateral for digital stable tokens
- Need for mining development funding and RWA claims on future gold production

Therefore, in Phase 1, we first issue **vRWA(Gold), which represents claims on future gold production**.

~~~mermaid
classDiagram
    RWA <|-- RWA-Gold
    RWA <|-- vRWA-Gold
    RWA : ERC-3643(RWA Standard)
    RWA : Permissioned Transfers
    RWA : Regulatory Compliance
    RWA-Gold : Exchange rights for physical gold
    RWA-Gold : Timing(Late Phase 1 or after Phase 2)
    vRWA-Gold : Claims on future gold
    vRWA-Gold : Timing(Phase 1 and additional issuance as needed)
~~~

While **vRWA** is designed to comply with the **ERC-3643 standard for RWA**, it faces fewer restrictions. This is because **in Phase 1, it is used only as collateral for KASH tokens** and is not directly exposed to investors, preventing transfers between investors.

**KASH tokens** - being standard **ERC-20** tokens with few restrictions - serve as the project's core concept, acting as both a **strategic intermediary allowing RWA assets to be utilized with minimal regulatory exposure initially** and as a stable currency in DeFi.

~~~mermaid
graph TD
    A[Physical Gold; Future Production] -- Tokenization of Future Gold Claims --> B[Gold vRWA];
    B -- Collateral Deposit --> C[KASH Reserve Vault];
    C -- Reserve Token Issuance Based on Collateral --> D[KASH];
~~~

:::tip[vRWA Structure in Phase 1 operates as follows]
- **1 oz gold = 1 vRWA issued → 3,125 KASH issued**
- **32,000 vRWA (approximately 1 ton) will be issued and directly deposited in the reserve pool as collateral** for KASH issuance
- In Phase 1, **a total of 100,000,000 KASH** will be issued, with reserve assets gradually converting to physical or virtual assets through vRWA settlement
- vRWA will be **partially settled monthly with virtual assets (e.g., stablecoins) equivalent to physical gold** and will be fully settled and burned by the end of Phase 1.
:::

:::danger[KASH from an Investor's Perspective]
**vRWA is not a direct investment target in the initial KASH Project.**

In the initial KASH Project, the investment target is the **KASH token**, and the **risk premium for vRWA** is provided as **staking interest** on KASH tokens.

Based on vRWA issuance volume, only **10%** of total KASH issuance is directly sold to investors, while **50%** is provided as interest.

**This represents an unprecedented yield compared to existing RWA projects that sell future gold claims at discounted prices.**
:::

:::note
While vRWA is designed as a Phase 1 solution, it has significant potential for future development as a funding mechanism for new real asset development and as a revenue source for KASH tokens.
:::

### 📆 Phase 1 Roadmap

:::info
Phase 1 of the KASH Project aims to establish the foundation for Indonesian Buru Island gold mining operations, starting with the **Gunung Botak gold mine development**, while laying groundwork for KASH's initial inflation and RWA activation.

During Phase 1, there may be attempts to pioneer major utilities for KASH tokens and various experiments with RWAs.

Various initiatives for the full-scale expansion of KASH and RWA in Phase 2 will begin during Phase 1 and continue to be implemented.
:::

:::danger[Phase 1 Key Achievements]
While Phase 1 of the KASH Project marks an important beginning, the most crucial objective is to **secure investor trust through complete settlement of vRWA**. Fully delivering the premium for the project's initial risk will be the key performance indicator for Phase 1.
:::

- **2025, Funding**
    - **[2025-09]** **Phase 1 vRWA and KASH issuance**
    - **[2025-09]** **First sale (5M KASH)**
    - **[After first sale ends]** First staking opens

- **2026, Exploration and Mining Preparation**
    - **[2026-01, 6M]** **Detailed exploration (feasibility study)**
    - **[2026-03]** **Second sale (5M KASH)**
    - **[After second sale ends]** Second staking opens
    - **[2026-07, 6M]** Ore processing plant construction

- **2027, Mining and Settlement**
    - **[2027-01, 12M]** **Mining begins and monthly vRWA settlement**
    - **[2027-06]** **First investor principal withdrawal opens**
    - **[2027-12]** **Second investor principal withdrawal opens**

- **2028, Phase 1 Completion**
    - **[2028-01, 12M]** Mining and monthly vRWA settlement
    - **[2028-12]** **First staking ends**
    - **[2028-12]** **Second staking ends**
    - **[2028-12]** **Phase 1 ends**

- **2029, vRWA Settlement Completion**
    - **[2029-01, 12M]** Mining and monthly vRWA settlement
    - **[2029-12]** **vRWA settlement completion**





<!-- ---
id: introduction
title: 1. KASH 프로젝트 개요
description: KASH 프로젝트의 기초자산과 목적
sidebar_position: 1
---

:::info
KASH 프로젝트는 금 등의 실물 자산 기반 RWA와 RWA 를 기반으로 하는 디지털 안정화 자산을 만들어 RWA 시장 개척과 디지털 금융 활성화를 목표로 합니다.

KASH 재단은 이를 이루기 위해 근간이 되는 인도네시아 금광을 개발하고 체계적인 RWA 기반 시스템 구축을 위한 단계들을 준비하고 실행할 예정입니다.
:::

### 🌐 프로젝트의 목적과 구조 개요

KASH 프로젝트는 **실물 자산을 기반으로 새로운 디지털 금융 시스템을 구축**하는 것을 목표로 합니다.

이를 위해 **1기에서는 다음 두 가지 핵심 목표**를 가지고 설계되었습니다:

1. **인도네시아 부루섬 금광 개발을 위한 펀딩과 개발**
2. **RWA 기반 디지털 자산(KASH)을 중심으로 한 온체인 금융 생태계의 실험 및 확장**

이를 달성하기 위해 KASH 프로젝트는 다음과 같은 메커니즘을 채택합니다:

- 금광 개발을 통해 생산될 **실물 금**을 기반으로
- **vRWA(Gold)**: 미래 금에 대한 청구권을 토큰화
- **KASH**: vRWA를 담보로 발행되는 리저브형 디지털 토큰
- **DeFi 유틸리티**: KASH를 기반으로 한 스테이킹, 유동성, 안정화, 담보 활용 구조

이 구조를 통해 KASH 프로젝트는 궁극적으로 **지속 가능한 기축 디지털 자산 구조를 설계**하고자 합니다.

### 🪙 프로젝트 기초 자산: 인도네시아 부루 금광

KASH 프로젝트는 **인도네시아 부루섬에서 실제 진행 중인 금광 개발 사업**을 기초 자산으로 시작됩니다.

이는 단순한 컨셉이 아닌, **지질 탐사와 채굴 가능성을 바탕으로 한 실물 수익 기반 실현형 프로젝트**입니다.

생산된 금은 추후 **RWA(Gold)로** 온체인에 토큰화되며,

이 자산이 KASH의 담보 구조와 DeFi 생태계로 연결됩니다.

### 🌱 1기에서의 현실적 접근

**금 기반 RWA (Real World Asset) 구조는 전통 금 투자 시장의 높은 진입장벽과 낮은 접근성, 유동성 제약을 해소할 혁신적 대안**으로 부상하고 있습니다. 

투자자들은 소액으로도 금 투자에 참여하고 24시간 거래를 통해 유연성을 얻으며, 금 자산을 디지털 금융에 연계함으로써 부가가치를 창출할 수 있다는 기대 효과가 있습니다. 

동시에 이러한 **장점이 실현되기 위해서는** 규제 명확화, 신뢰할 수 있는 인프라 구축, 충분한 시장 조성 등 해결해야 할 과제들도 남아 있습니다. 

KASH 프로젝트는 몇가지 이유로 1기에서는 금에 대한 직접적인 RWA를 다루지 않습니다. 
- 투자자들이 직접적으로 접근 가능한 RWA 규제의 미비
- RWA의 첫번째 기능; 안정화 디지털 토큰의 담보로서의 단계적 대안
- 광산 개발을 위한 펀딩과 생산될 미래 금에 대한 청구권 RWA의 필요

따라서 1기에서는 **생산 예정 금에 대한 청구권인 vRWA(Gold)** 를 먼저 발행합니다.

~~~mermaid
classDiagram
    RWA <|-- RWA-Gold
    RWA <|-- vRWA-Gold
    RWA : ERC-3643(RWA 표준)
    RWA : Permissioned Transfers
    RWA : Regulatory Compliance
    RWA-Gold : 실물 금에 대한 교환권
    RWA-Gold : 시기(1기 후반 혹은 2기 이후)
    vRWA-Gold : 미래 금에 대한 청구권
    vRWA-Gold : 시기(1기 그리고 필요에 따라 추가 발행)
~~~

**vRWA**는 **RWA로서의 ERC-3643 표준**을 준수하도록 설계되지만 제약을 크게 받지는 않습니다. 이유는 **1기에는 KASH 토큰 담보로만 사용되어** 투자자에게 직접적으로 노출되지 않아 투자자간 전송이 발생하지 않기 때문입니다.

**KASH 토큰**은 - KASH 토큰은 일반적인 **ERC-20** 표준 토큰으로 큰 제약이 없습니다 - **초기에 RWA 자산이 규제에 크게 노출되지 않으면서 활용될 수 있는 전략적 매개물 역할**을 하면서 동시에 디파이에서 안정적인 기축 통화 역할을 할 프로젝트 핵심 컨셉입니다.

~~~mermaid
graph TD
~~~

:::tip[1기에서의 vRWA 구조는 다음과 같이 작동합니다]
- **1 oz 금 = 1 vRWA 발행 → 3,125 KASH 발행**
- **vRWA는 32,000개 (대략 1톤)가 발행 후 리저브풀에 직접 예치되어 KASH 발행의 담보**로 사용
- KASH는 1기에서 **총 100,000,000개**가 발행되며, vRWA 청산을 통해 점차 리저브 자산이 실물 혹은 가상자산으로 전환됩니다
- vRWA는 매월 주기적으로 **실물 금 대신 동등 가치의 가상자산(예: 스테이블코인)으로 분할 청산**되며, 1기 종료 시점까지 전량 청산 및 소각됩니다.
:::

:::danger[투자자 관점에서의 KASH]
**초기 KASH 프로젝트에서 vRWA는 직접적인 투자 대상이 아닙니다.**

초기 KASH 프로젝트에서 투자 대상은 **KASH 토큰**이며, **vRWA에 대한 리스크 프리미엄**은 KASH 토큰 **스테이킹 이자**로서 제공됩니다. 

vRWA 발행량에 근거해 KASH가 발행되어 총 발행량의 **10%** 만이 직접적으로 투자자에게 판매되며 **50%** 가 이자로 제공됩니다. 

**이는 미래 금 청구권을 할인된 가격에 판매하는 기존의 RWA 프로젝트에서 볼 수 없는 높은 수익률입니다.**
:::

:::note
vRWA는 프로젝트 1기의 솔루션으로 기획되었으나 향후에도 새로운 실물 자산 개발을 위한 펀딩과 KASH 토큰의 수익원으로 발전 가능성이 충분합니다.
:::

### 📆 1기 로드맵

:::info
KASH 프로젝트 1기는 **구눙 보타(Gunung Botak) 금광 개발**을 시작으로 인도네시아 브루섬 금광 사업의 기반을 다지며 KASH 최초 인플레이션과 RWA 활성화를 위한 기초를 다지는데 목표가 있습니다.

1기 중에도 KASH 토큰의 주요 유틸리티를 개척하는 시도가 있을 수 있으며, RWA에 대한 다양한 실험도 있을 수 있습니다.

2기에서 본격적인 KASH와 RWA의 확장을 위한 다양한 시도가 1기에 있을 것이며 계속 반영될 예정입니다.
:::

:::danger[1기 핵심 성과]
KASH 프로젝트에서 1기는 시작으로서 매우 중요한 의미가 있지만, 가장 중요한 목표는 **vRWA의 완전한 청산**을 통해 투자자들의 신뢰를 확보하는 것입니다. KASH 프로젝트의 초기 리스크에 대한 프리미엄을 완전히 전달하는 것이 1기의 핵심 성과 지표가 될 것입니다.
:::

- **2025, 펀딩**
    - **[2025-09]** **1기 분량 vRWA 및 KASH 발행**
    - **[2025-09]** **1차 세일 (5M KASH)**
    - **[1차 세일 종료 후]** 1차 스테이킹 오픈

- **2026, 탐사 및 채굴 준비**
    - **[2026-01, 6M]** **정밀 탐사 (feasibility study)**
    - **[2026-03]** **2차 세일 (5M KASH)**
    - **[2차 세일 종료 후]** 2차 스테이킹 오픈
    - **[2026-07, 6M]** 선광 플랜트 구축

- **2027, 채굴 및 청산**
    - **[2027-01, 12M]** **채굴 시작 및 매달 vRWA 청산**
    - **[2027-06]** **1차 투자자 원금 출금 오픈**
    - **[2027-12]** **2차 투자자 원금 출금 오픈**

- **2028, 1기 종료**
    - **[2028-01, 12M]** 채굴 및 매달 vRWA 청산
    - **[2028-12]** **1차 스테이킹 종료**
    - **[2028-12]** **2차 스테이킹 종료**
    - **[2028-12]** **1기 종료**

- **2029, vRWA 청산 완료**
    - **[2029-01, 12M]** 채굴 및 매달 vRWA 청산
    - **[2029-12]** **vRWA 청산 완료**

 -->
