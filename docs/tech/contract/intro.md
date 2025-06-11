---
id: intro
sidebar_position: 1
description: KASH 프로젝트를 구성하는 주요 스마트 컨트랙트들의 역할과 상호작용, 데이터 흐름에 대한 개요입니다.
---

# Architecture Overview

KASH 프로젝트의 스마트 컨트랙트 시스템은 명확한 역할 분담과 효율적인 상호작용을 목표로 설계되었습니다. 핵심 기능들은 모듈화된 컨트랙트들로 구현되며, 필요한 경우 업그레이드가 가능하도록 UUPS 프록시 패턴으로 작성 되었습니다.

:::note
이 하위 문서 내 가칭이라는 표현은 설계상의 개념으로만 존재하고, 아직 실제로 구현되지 않았으며 변경 가능성이 있다는 의미입니다.
:::

---

### Contract Groups

다음은 KASH 생태계를 구성하는 스마트 컨트랙트 주요 그룹과 역할입니다.

1. Token Group : 토큰 컨트랙 및 이와 긴밀히 연관된 컨트랙트의 그룹입니다.
2. Reserve Group : KASH 가치를 지지하는 리저브 볼트 및 연관 컨트랙트의 그룹입니다.
3. Staking Group : KASH 1기의 주요 기능인 스테이킹 관련 컨트랙입니다.
4. Stabilization Group : KASH 가치 안정화를 위한 RBS 등의 컨트랙군입니다.
5. Sales Group : KASH 초기 판매 및 DCR 등 연관 로직을 위한 그룹입니다.
6. Governance Group : 거버넌스로서 역할하여 프로토콜 전반에 영향을 주는 컨트랙입니다.

---

### Token Group

+ KASH Token
    + ERC-20 기반의 KASH 네이티브 토큰. 
    + 발행, 소각, 전송 등 기본적인 토큰 기능을 담당합니다.

+ vRWA Token
    + ERC-3643 기반의 vRWA 토큰. 
    + 미래 금 청구권을 나타내며, 권한 관리 기능이 포함될 수 있습니다.

+ RWA Gold Token (가칭)
    + ERC-3643 기반의 금 RWA 토큰. 
    + 실물 금을 기반으로 발행되며, PoR(Proof of Reserve)과 연계될 수 있습니다.

+ ERC-3643
    + Compliance _$(tokenName) : RWA 토큰의 규제 준수를 위한 검사기
    + Identity Registry : EOA의 신원(ONCHAINID)를 확인, 관리
    + Claim Topic Registry : 사용되는 토픽 관리
    + Trusted Issuer Registry : 신뢰하는 토픽 발급자 관리

---

### Reserve Group

+ Reserve Vault
    + KASH의 담보물(vRWA, RWA, 스테이블코인 등)을 예치하고 관리합니다.
    + vRWA Settler, Kash Controller에 의해서 자산이 변동됩니다.
    + 인출은 Kash Controller에 의해서만 가능합니다.

+ vRWA Settler
    + 유동성 자산을 볼트에 보관하여 vRWA의 청산을 진행하는 컨트랙입니다.
    + 혹은 사고시 보험 풀로부터 KASH을 수령하여 vRWA의 청산을 진행합니다.

+ Insurance Vault
    + vRWA가 예정대로 청산 되지 못한 때를 위한, 보험 용도의 KASH 보관소입니다.
    + vRWA Settler에 의해 호출되어 실현해야 하는 가치만큼의 KASH를 내어줍니다.

+ Kash Issuer
    + KASH 토큰을 발행, 소각할 수 있는 권한을 전담하는 컨트랙트입니다.
    + Reserve Vault에 vRWA등 담보를 예치하는 조건으로 KASH 발행이 가능합니다.
    + vRWA Settler 요청에 의해 청산 실패시 KASH의 소각을 진행합니다.

+ Vault Controller
    + Reserve Vault에서 자산을 인출할 수 있는 유일한 컨트랙입니다.
    + 기본적으로 KASH의 가치를 유지하면서 발행 및 소각을 위해 자산을 움직입니다.
    + RBS Escrow에 한하여 Reserve Vault의 자산을 운용할 수 있는 권한을 가집니다.

+ RBS Escrow
    + RBS 운영을 위해 리저브 볼트에서 자산을 차용하는 컨트랙입니다. 
    + 개별 채권 시장에 대한 Instance 팩토리 역할을 합니다.
    + Instance에는 차용한 자산 및 현재까지 사용된 자산, 매수된 KASH 등의 정보가 포함됩니다.

---

# Staking Group

+ Staking Pool _$(poolName)
    + 사용자가 KASH를 예치하고 스테이킹 보상을 받는 핵심 컨트랙트입니다.
    + 지분(Share) 발행, 보상 계산, DCR을 활용한 가상 지분(Virtual Share) 관리 기능을 포함합니다. 
    + 풀별로 독립적으로 운영됩니다.

+ Staking Reward Distributor
    + 스테이킹을 위해 할당된 KASH 총 보상량을 보관합니다.
    + 각 Staking Pool의 요청에 따라 Strategy에 정의된 로직대로 Epoch 보상을 지급합니다.

+ Reward Strategy _$(poolName)
    + 각 스테이킹 풀의 Epoch 정보 및 보상 식 등 정책을 저장합니다.
    + 현재 Epoch 계산, Epoch별 보상량 등 보상 계산을 위한 함수를 제공합니다.
    
+ Reservation Pool
    + 스테이킹 풀의 예치 한도 초과 시 사용자들이 예치를 예약하는 컨트랙입니다.
    + 이후 순서대로 참여할 수 있도록 지원합니다.

---

### Stabilization Group

+ Kash Appraiser
    + FV, IV, DFV, DIV 등 KASH의 가치 지표를 계산합니다.
    + 일부 로직은 오프체인 계산 후 온체인 파라미터로 반영될 수도 있습니다.
    + 이 때 event log로 계산에 사용된 인자를 포함하여 사후 검증 가능합니다.

+ Bond Market
    + KASH 매수/매도 채권 시장을 관리합니다.
    + 매도시 Treasury를 자금원으로 하여 즉시 KASH를 차용하고 유동성 자산을 반환합니다.
    + 매수시 RBS Escrow를 자금원으로 하며, 미리 Escrow에 할당받은 자산을 즉시 차용합니다.
    + 또한 매수시 차용 및 매수한 KASH 내역을 RBS Escrow 내의 각 Instance에 기록합니다.

+ Bond Issuer
    + 신규 채권 시장을 만들기 위해 RBS Escrow를 통해 새 인스턴스를 만듭니다.
    + 초기에는 수동으로 운영되며 점차 발행 조건등이 온체인 로직으로 구체화됩니다.
    + 추후에는 누구나 호출하여 조건을 만족하는 경우 시장을 개설할 수 있도록 목표합니다.

+ Treasury Vault
    + PoL을 위한 판매용 KASH 및 PoL 자산(LP)을 보관합니다.
    + 현재로서는 초기에 KASH를 할당 받은 이후 별도 보충 수단이 없습니다.
    + 따라서 KASH는 점감하며 PoL로 점차 변환됩니다.

---

### Sales Group

+ Sales Market
    + 지정된 자산(예: 스테이블코인, KAIA)을 받고 KASH를 판매하는 Fixed-ratio swap 컨트랙입니다.
    + 판매 정보(결과)를 DCR Manager에 전달합니다.
    + 판매로 받은 자산은 Service Admin Multisig로 우선 전달 후 용도에 따라 사용

+ Sales Vault
    + 세일즈를 위해 할당된 KASH 보관처입니다.
    + 세일즈 개시시에 수동으로 각 Sales Market에 필요한 만큼 전송됩니다.

+ DCR Manager
    + DCR(Debt Creation Right)의 발급 및 사용을 관리합니다. 
    + DCR은 영구적인 요소가 아니기 때문에 내부 회계로 처리합니다.
    + 세일즈 컨트랙트와 연동하여 참여 시점에 따른 EPB를 계산하고 DCR 정보를 기록합니다.

+ DCR Strategy _$(salesName)
    + 세일즈 종류에 따라 발급할 DCR 수량을 결정하는 수식을 포함한 참조 컨트랙입니다.

---

### Governance Group

+ Kash Oracle
    + 금 가격, KASH 시장 가격 등 운영에 필요한 데이터를 관리합니다. 
    + 초기에는 해킹 리스크를 피하기 위해 거버넌스로부터 직접 입력받아 관리됩니다.
    + vRWASettler, Kash Controller, KashAppraiser 등지에서 참조됩니다.
    + 추후 Proof of Reserve를 위한 정보도 여기에 담깁니다. 

+ Parameter Store
    + 서킷 브레이크등 전역적으로 영향을 미치는 설정 값들이 저장됩니다.
    + 거버넌스에 의해 설정됩니다.

+ Multisig(Safe)
    + KASH는 현실의 금광과 긴밀하게 연결된 프로젝트의 특수성으로 인해 재단에 의해 직접 운영됩니다.
    + DAO를 통한 거버넌스 운영은 아직 계획되어 있지 않습니다. 
    + 거버넌스 활동은 다음과 같은 멀티시그 계정에 의해 수행됩니다.
        + Master Admin : KAIA재단, KASH재단, 신탁회사 세 곳이 나눠가진 콜드 월렛의 2 of 3 멀티시그입니다. 프로젝트의 가장 중요한 작업 및 Service Admin 관리 권한을 갖습니다.
        + Service Admin : KASH 재단 내부 핫 월렛의 2 of 3 멀티시그입니다. 서비스의 일반적인 운영을 위한 권한 및 비상시 운영 중지 권한을 가집니다.

+ Team Vault
    + 팀의 수익 실현을 위한 KASH를 보관하는 컨트랙입니다.
    + 3년간 인출이 불가하며 이후 지정된 계정이 인출 가능합니다.

+ Operation Vault
    + 팀의 운영 비용 충당을 위한 KASH를 보관하는 컨트랙입니다.
    + Service Admin에 의해 출금 가능합니다.

---

### 데이터 흐름

1. vRWA 발행
    + Owner는 vRWA를 언제나 원하는 수량 만큼 발행 가능
    + 단, 이는 블록체인 상에 한정된 것
    + 실제로는 해당 vRWA의 실현 가능성 등을 신탁회사 등을 통해 허가 후 발행 가능

1. KASH 발행 (프로젝트 개시시)
    + Owner가 계획된 초기 vRWA 수량만큼 미리 발행하여 Kash Controller로 전송
    + Kash Controller의 Initialize Project () 실행
    + vRWA는 Reserve Vault 로 보내진다
    + 지정된 수량의 KASH를 발행하여 지정된 용도 (보험, 세일즈 등) 의 풀로 보낸다

1. KASH 발행 (추후 필요시)
    + Owner는 vRWA를 Kash Controller에 approve 하고 Mint KASH () 를 실행
    + 현재 Reserve Vault의 유동성 자산 및 vRWA의 가치를 계산한다
    + KASH의 발행량으로 나누어 KASH 하나당 현재 가치를 구한다
    + Kash Controller가 받은 vRWA 가치에 맞게 KASH를 발행한다
    + Kash Controller가 받은 vRWA를 리저브 볼트로 보낸다

1. vRWA 청산 (정상 청산시)
    + 프로젝트 진행으로 얻은 유동성 자산을 vRWA Settler에 예치(전송)
    + vRWA Settler는 해당 자산을 Reserve Vault에 Approve
    + vRWA Settler는 Reserve Vault의 Settlement vRWA 실행
    + Reserve Vault는 적정량의 유동성 자산인지 Oracle을 참조하여 판단
    + Reserve Vault는 유동성 자산을 자신에게 보내고 vRWA를 vRWA Settler에게 전달
    + vRWA Settler는 vRWA를 소각

1. vRWA 청산 (사고 발생시)
    + 보험 풀을 동작하여 vRWA Settler로 KASH 전송
    + vRWA Settler는 해당 자산을 Kash Controller에 Approve
    + vRWA Settler는 Kash Controller의 Burn KASH for Settlement 실행
    + Kash Controller는 적정량의 KASH인지 Oracle을 참조하여 판단
    + Kash Controller는 KASH를 자신에게 보내어 소각
    + Kash Controller는 Reserve Vault에게 vRWA를 vRWA Settler에게 전달하도록 지시
    + vRWA Settler는 vRWA를 소각


1. RBS 채권 운영 (매수시)
    + KashAppraiser 참조, BondIssuer를 통해 채권 시장 개시 결정
    + RBSEscrow를 통해 Escrow Instance 생성
    + 가장 나쁜 가격(최고가) * 채권 수량만큼 ReserveVault -> Instance로 유동성 자산 이동 (차용)
    + 차용 시점의 가격에 따라 회수해야 할 KASH의 수량을 함께 기록
    + BondMarket을 통해 유동성 자산으로 KASH 매수
    + 시장 종료시 Instance에 남은 유동성 자산과 KASH가 차용액 이상인지 확인
    + 쌓인 KASH는 Kash Controller를 통해 소각 유동성 자산은 ReserveVault로 환원




<!-- ## 데이터 흐름 (예시)

1.  **초기 세일즈 및 DCR 발급**:
    *   사용자 → `KashSales.sol`: 구매 자금 전송
    *   `KashSales.sol` → `KashToken.sol`: KASH 분배
    *   `KashSales.sol` → `DCRManager.sol`: 판매량, 구매자 정보 전달
    *   `DCRManager.sol`: EPB 계산 후 DCR 발급 (내부 기록)

2.  **스테이킹 및 보상**:
    *   사용자 → `EarlyStakingPool.sol`: KASH 예치 (DCR 행사 요청 시 `DCRManager.sol` 조회)
    *   `EarlyStakingPool.sol`: 지분(Share) 발행
    *   Keeper 또는 사용자 → `EarlyStakingPool.sol`: `updateEpoch()` 호출 (주기적)
    *   `EarlyStakingPool.sol` → `StakingRewardDistributor.sol`: 보상 분배 요청
    *   `StakingRewardDistributor.sol` (내부 `StakingRewardStrategyEarly.sol` 참조): 보상량 계산 후 `EarlyStakingPool.sol`로 KASH 전송
    *   `EarlyStakingPool.sol`: 수신된 보상을 지분 가격에 반영 (자동 복리)

3.  **KASH 발행 (vRWA 담보)**:
    *   재단/관리자 → `VRWAToken.sol` 예치 → `ReservePool.sol`: vRWA 예치
    *   `ReservePool.sol` → `KashToken.sol`: KASH 발행 (KASH_MINT_RATIO_PER_VRWA 기반)

4.  **RBS 채권 운영**:
    *   `RBSOracle.sol` (또는 오프체인): 시장 가격, 금 가격 데이터 업데이트
    *   `RBSValuationModel.sol` (또는 오프체인): 가치 지표 계산
    *   RBS 판단 로직 (온/오프체인) → `BondMarket.sol`: 채권 시장 개설/조건 설정
    *   사용자 ↔ `BondMarket.sol`: 채권 구매/상환
    *   `BondMarket.sol` ↔ `Treasury.sol`: 자금 이동

## 설계 원칙

*   **최소 권한 원칙**: 각 컨트랙트는 자신의 역할 수행에 필요한 최소한의 권한만을 가집니다.
*   **업그레이드 가능성**: 주요 로직 컨트랙트는 프록시 패턴을 사용하여 업그레이드가 가능하도록 설계될 수 있습니다 (예: UUPS).
*   **모듈성 및 재사용성**: 공통 기능은 라이브러리나 기본 컨트랙트로 분리하여 코드의 재사용성을 높이고 유지보수를 용이하게 합니다.
*   **가스 효율성**: 사용자 트랜잭션 및 시스템 운영에 있어 가스 비용을 최적화하기 위한 설계를 고려합니다.
*   **보안**: 알려진 취약점을 방지하고, 외부 감사 등을 통해 코드의 안정성을 확보합니다. (별도 보안 문서에서 상세히 다룸) -->

---

이 아키텍처는 KASH 프로젝트가 성장하고 발전함에 따라 유연하게 적응하고 확장될 수 있는 기반을 제공하는 것을 목표로 합니다. 각 구성 요소에 대한 더 자세한 내용은 이어지는 문서에서 확인할 수 있습니다.