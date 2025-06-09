---
id: intro
sidebar_position: 1
description: KASH 프로젝트를 구성하는 주요 스마트 컨트랙트들의 역할과 상호작용, 데이터 흐름에 대한 개요입니다.
---

# Architecture Overview

KASH 프로젝트의 스마트 컨트랙트 시스템은 명확한 역할 분담과 효율적인 상호작용을 목표로 설계되었습니다. 핵심 기능들은 모듈화된 컨트랙트들로 구현되며, 필요한 경우 업그레이드가 가능하도록 UUPS 프록시 패턴으로 작성 되었습니다.

---

### Contract Groups

다음은 KASH 생태계를 구성하는 스마트 컨트랙트 주요 그룹과 역할입니다.

1.  **토큰 컨트랙트 (Token Contracts):**
    *   `KashToken.sol`: KASH 네이티브 토큰 (ERC20). 발행, 소각, 전송 등 기본적인 토큰 기능을 담당합니다.
    *   `RWAGoldToken.sol`: RWA(Gold) 토큰 (ERC3643). 실물 금을 기반으로 발행되며, PoR(Proof of Reserve)과 연계될 수 있습니다.
    *   `vRWAGoldToken.sol`: vRWA(Gold) 토큰 (ERC3643). 미래 금 청구권을 나타내며, 권한 관리 기능이 포함될 수 있습니다.

2.  **리저브 및 발행 관리 컨트랙트 (Reserve & Issuance Management):**
    *   `ReserveVault.sol`: KASH의 담보물(vRWA, RWA, 스테이블코인 등)을 예치하고 관리합니다.
        +  vRWASettler 및 KashIssuer에 의해서만 자산이 변동됩니다.
    + vRWASettler : 유동성 자산 혹은 보험 풀로부터 KASH을 받아 vRWA 청산을 진행하는 컨트랙입니다.
    + KashIssuer : KASH 토큰을 발행, 소각할 수 있는 권한을 전담하는 컨트랙트입니다.
    + RBSEscrow : RBS 운영을 위해 리저브 볼트에서 자산을 차용하는 컨트랙입니다. 개별 채권 시장에 대한 Instance를 내부적으로 관리합니다.
        + Escrow Instance : 개별 채권 시장에 대해 차용한 자산 및 매수된 KASH를 보관하는 장소입니다.

3.  **스테이킹 메커니즘 컨트랙트 (Staking Mechanism):**
    *   `StakingPool_{poolName}.sol`: 사용자가 KASH를 예치하고 스테이킹 보상을 받는 핵심 컨트랙트입니다. 지분(Share) 발행, 보상 계산, DCR을 활용한 가상 지분(Virtual Share) 관리 기능을 포함합니다. 풀별로 독립적으로 운영됩니다.
    *   `StakingRewardDistributor.sol`: 스테이킹을 위해 할당된 KASH 총 보상량을 보관하고, 각 `StakingPool`의 요청에 따라 `StakingRewardStrategy`에 정의된 로직대로 Epoch별 보상을 분배합니다.
        *   `StakingRewardStrategy_{poolName}.sol`: 각 스테이킹 풀의 Epoch 계산, Epoch별 보상량 등 보상 분배 정책을 정의합니다.
    *   `ReservationPool.sol` (선택적): 스테이킹 풀의 예치 한도 초과 시 사용자들이 예치를 예약하고 순서대로 참여할 수 있도록 지원하는 컨트랙트입니다.

4.  **RBS 및 가격 안정화 컨트랙트 (RBS & Price Stabilization):**
    *   `KashAppraiser.sol` : FV, IV, DFV, DIV 등 KASH의 가치 지표를 계산합니다. (일부 로직은 오프체인 계산 후 온체인 파라미터로 반영될 수도 있음)
    *   `BondMarket.sol` : KASH 매수/매도 채권 시장을 관리합니다. 매수시 각 Escrow Instance를, 매도시 Treasury를 자금원으로 합니다.
    + BondIssuer.sol : Escrow를 발행하고 신규 채권 시장을 만듭니다.
    *   `Treasury.sol` : PoL을 위한 판매용 KASH 및 PoL 자산(LP)을 보관합니다.

5.  **세일즈 컨트랙트 (Sales Contracts):**
    *   `KashSales.sol` : KASH 토큰의 초기 판매를 담당합니다. 지정된 자산(예: 스테이블코인, KAIA)을 받고 KASH를 분배하며, 판매 정보를 `DCRManager`에 전달할 수 있습니다.
    *   `DCRManager.sol`: DCR(Debt Creation Right)의 발급 및 사용을 관리합니다. 세일즈 컨트랙트와 연동하여 참여 시점에 따른 EPB를 계산하고 DCR 정보를 기록합니다.
        + `DCRStrategy_{salesName}.sol` : 세일즈 종류에 따라 발급할 DCR 수량을 결정하는 수식을 포함한 참조 컨트랙입니다.

6.  **거버넌스 컨트랙트 (Governance Contracts):**
    *   `KashOracle.sol`: 금 가격, KASH 시장 가격 등 운영에 필요한 데이터를 관리합니다. 초기에는 거버넌스로부터 직접 입력받아 관리됩니다. vRWASettler, KashIssuer, KashAppraiser 등지에서 참조됩니다.
    + Multisig(KAIA Safe) : KASH는 현실의 금광과 긴밀하게 연결된 프로젝트의 특수성으로 인해 재단에 의해 직접 운영되며, DAO를 통한 거버넌스 운영은 아직 계획되어 있지 않습니다. 거버넌스 활동은 다음과 같은 멀티시그 계정에 의해 수행됩니다.
        + Master Admin : KAIA재단, KASH재단, 신탁회사 세 곳이 나눠가진 콜드 월렛의 2 of 3 멀티시그입니다. 프로젝트의 가장 중요한 작업 및 Service Admin 관리 권한을 갖습니다.
        + Service Admin : KASH 재단 내부 핫 월렛의 2 of 3 멀티시그입니다. 서비스의 일반적인 운영을 위한 권한 및 비상시 운영 중지 권한을 가집니다.

## 데이터 흐름

1. RBS 채권 운영 (매수시)
    + KashAppraiser 참조, BondIssuer를 통해 채권 시장 개시 결정
    + RBSEscrow를 통해 Escrow Instance 생성
    + 가장 나쁜 가격(최고가) * 채권 수량만큼 ReserveVault -> Instance로 유동성 자산 이동 (차용)
    + 차용 시점의 가격에 따라 회수해야 할 KASH의 수량을 함께 기록
    + BondMarket을 통해 유동성 자산으로 KASH 매수
    + 시장 종료시 Instance에 남은 유동성 자산과 KASH가 차용액 이상인지 확인
    + 쌓인 KASH는 KashIssuer를 통해 소각 유동성 자산은 ReserveVault로 환원




## 데이터 흐름 (예시)

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
*   **보안**: 알려진 취약점을 방지하고, 외부 감사 등을 통해 코드의 안정성을 확보합니다. (별도 보안 문서에서 상세히 다룸)

이 아키텍처는 KASH 프로젝트가 성장하고 발전함에 따라 유연하게 적응하고 확장될 수 있는 기반을 제공하는 것을 목표로 합니다. 각 구성 요소에 대한 더 자세한 내용은 이어지는 문서에서 확인할 수 있습니다.