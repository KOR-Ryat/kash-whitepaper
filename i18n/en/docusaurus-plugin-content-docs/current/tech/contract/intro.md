---
id: intro
sidebar_position: 1
description: KASH 프로젝트를 구성하는 주요 스마트 컨트랙트들의 역할과 상호작용, 데이터 흐름에 대한 개요입니다.
draft: true
---

# Architecture Overview

KASH 프로젝트의 스마트 컨트랙트 시스템은 명확한 역할 분담과 효율적인 상호작용을 목표로 설계되었습니다. 핵심 기능들은 모듈화된 컨트랙트들로 구현되며, 필요한 경우 업그레이드가 가능하도록 UUPS 프록시 패턴으로 작성 되었습니다.

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

### Permission

각 컨트랙트는 필요에 따라 다음 Role의 주소에 권한을 부여합니다.

+ EOA : Multisig (Safe)
    + MASTER_ADMIN_ROLE
        + Master Admin 멀티시그. 프로토콜의 소유자이며, 가장 중요한 파라미터 변경 및 컨트랙트 업그레이드 권한을 가집니다.
    + SERVICE_ADMIN_ROLE
        + Service Admin 멀티시그. 일상적인 운영, 비상시 중지/재개, 파라미터의 비정기적 업데이트 등 일반적인 관리 권한을 가집니다.
        + 프로젝트 초기 세팅시에 한해 MASTER_ADMIN의 권한을 가집니다.
+ Smart Contract
    + ISSUER_ROLE
        + KashIssuer 컨트랙트. 토큰 발행/소각 권한을 위임받습니다.
    + CONTROLLER_ROLE
        + VaultController 컨트랙트. ReserveVault에서 자산 인출 권한을 위임받습니다.
    + SETTLER_ROLE
        + vRWASettler 컨트랙트. 청산 관련 로직을 수행할 권한을 위임받습니다.
    + MARKET_ROLE
        + SalesMarket 또는 BondMarket 컨트랙트. 특정 금고에서 자금을 인출할 권한을 가집니다.
    + DCR_MANAGER_ROLE
        + DCRManager 컨트랙트. 스테이킹 풀에 가상 지분을 추가할 권한을 가집니다.
### KASH 프로젝트 스마트 컨트랙트 권한 매트릭스 (Permission Matrix)

본 매트릭스는 KASH 프로젝트 내 스마트 컨트랙트 간의 권한 및 상호작용을 명확히 정의합니다.

**범례:** ✅ = 해당 역할이 함수를 호출할 수 있는 권한을 가짐

| 컨트랙트 그룹 | 컨트랙트 | 주요 함수 (Privileged Function) | Master Admin | Service Admin | Team Member | 호출 가능 컨트랙트 (Calling Contract) |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Token Group** | `KASH` | `mint()` | | | | `Kash Issuer` |
| | | `pause()`, `unpause()` | | ✅ | | |
| **Reserve Group** | `Reserve Vault` | `withdraw()` | | | | `Vault Controller` |
| | | `emergencyWithdraw()` | ✅ | | | |
| | `vRWA Settler` | `settle()` | | ✅ | | |
| | `Insurance Vault` | `claim()` | | | | `vRWA Settler` |
| | | `fund()` | | | | `Kash Issuer` |
| | `Kash Issuer` | `mint()` (1기) | | ✅ | | |
| | `Vault Controller`| `escrow()` | | | | `RBS Escrow Factory` |
| | | `settleByAsset()`, `settleByInsurace()` | | | | `vRWA Settler` |
| | | `exercisePCR()` | | | | `PCR Manager` |
| | `RBS Escrow Factory` | `createEscrow()` | | | | `Bond Issuer` |
| | `RBS Escrow Instance` | `claimAsset()` | | | | `Bond Market Instance (해당 마켓)` |
| | | `depositKASH()` | | | | `Bond Market Instance (해당 마켓)` |
| | | `closeEscrow()` | | | | `Bond Issuer` |
| **Staking Group** | `Staking Pool` | `exercisePCR()` | | | | (사용자 호출, 내부적으로 PCR Manager 호출) |
| | `Staking Reward Distributor` | `addStakingPool()` | | ✅ | | |
| | | `claimEpochReward()` | | | | `Staking Pool` |
| **Stabilization Group** | `Bond Issuer` | `issueMarket()` | | ✅ | | |
| | `Treasury Vault`| `fundMarket()` | | | | `Bond Issuer` |
| | | `withdrawAsset()` | | ✅ | | |
| **Sales Group** | `Sales Market` | `addPair()` | | ✅ | | |
| | | `closeMarket()` | | ✅ | | |
| | `Sales Vault` | `fundMarket()` | | ✅ | | |
| | `PCR Manager` | `tokenSold()` | | | | `Sales Market` |
| | | `exercisePCR()` | | | | `Staking Pool` |
| | `DCR Manager` | `tokenSold()` | | | | `Sales Market` |
| | | `exerciseDCR()` | | | | `Staking Pool` |
| | `DCR Strategy`| `setVariable()` | | ✅ | | |
| **Governance Group** | `Price Oracle` | `setValue...()` | | ✅ | | |
| | `Parameter Store`| `setValue...()` | | ✅ | | |
| | `Access Manager`| `grantRole()` | ✅ | ✅ | | `Master Admin` 또는 `Service Admin` (역할 계층에 따라) |
| | `Team Vault` | `claim()` | | | ✅ | |
| | | `accidentClaim()` | | | | `Insurance Vault` |
| | `Operation Vault` | `withdraw()` | | ✅ | | |
---

<!-- ### Contract Lifetime

KASH의 프로토콜 설계 상에서 각 스마트 컨트랙트는 다음과 같이 분류됩니다.

1. 영구
    + KASH 프로젝트가 지속되는 한 반영구적으로 사용되는 역할의 컨트랙입니다.
    + 단, 컨트랙트의 로직은 Upgradable로 세부 사항은 변화할 수 있습니다.

2. 초기
    + KASH 1기 혹은 초기에 한정하여서만 운영될 가능성이 있는 컨트랙입니다.
    + 1기에서는 반드시 운용되나, 추후에는 필요에 따라 사용되지 않을 가능성이 있습니다.

3. 확장
    + KASH 1기에서는 사용되지 않지만 이후 운영될 가능성이 있는 컨트랙입니다.
    + 현재 시점에서 포함 가능성이 높은 것으로, 반드시 사용될 예정이라는 의미는 아닙니다.

--- -->

### Token Group

프로토콜 내 존재하는 토큰과 이와 긴밀히 연관된 컨트랙이 속하는 그룹입니다. 대체로 반영구적인 성격을 지니며, RWA의 경우 요구사항 및 고도화에 따른 변경의 가능성이 있습니다.

+ KASH Token
    + ERC-20 기반의 KASH 네이티브 토큰. 
    + 발행, 소각, 전송 등 기본적인 토큰 기능을 담당합니다.
    + 함수 목록
        + ERC-20 : approve, transfer, ...
        + mint(address to, uint256 amount) : onlyRole(KASH_ISSUER_ROLE)
        + burn(uint256 amount), burnFrom(address from, uint256 amount)
        + pause(), unpause() : onlyRole(SERVICE_ADMIN_ROLE)

+ vRWA Token
    + ERC-20 기반의 ERC-3643을 준수하는 vRWA 토큰. 
    + 미래 금 청구권을 나타내며, 권한 관리 기능이 포함될 수 있습니다.
    + 함수 목록
        + ERC-20 : approve, transfer, ...
        + ERC-3643 : setIdentityRegistry(address registryAddress), setCompliance(address complianceAddress) : onlyRole(MASTER_ADMIN_ROLE)
        + mint(address to, uint256 amount) : onlyRole(MASTER_ADMIN_ROLE)
        + burn(uint256 amount), burnFrom(address from, uint256 amount)
        + pause(), unpause() : onlyRole(SERVICE_ADMIN_ROLE)

+ RWA Gold Token
    + ERC-20 기반의 ERC-3643을 준수하는 vRWA 토큰. 
    + 실물 금을 기반으로 발행되며, PoR(Proof of Reserve) 연계 등 구체적인 로직은 추후 확정 예정입니다.
    + 함수 목록은 vRWA와 동일합니다.

+ ERC-3643
    + Compliance (tokenName) : 각 RWA 토큰의 규제 준수를 위한 검사
    + Identity Registry : EOA의 신원(ONCHAINID) 확인, 관리
    + Claim Topic Registry : 사용되는 토픽 관리
    + Trusted Issuer Registry : 신뢰하는 토픽 발급자 관리

---

### Reserve Group

KASH 가치를 지지하는 리저브 볼트 및 이와 연관된 컨트랙트의 그룹입니다. Reserve Vault의 경우 반영구적이며, 이와 연관된 다른 요소들은 요구사항 및 고도화에 따른 변경의 가능성이 있습니다.

+ Reserve Vault
    + KASH의 담보물(vRWA, RWA, 스테이블코인 등)을 예치하고 관리합니다.
    + vRWA Settler, Kash Controller에 의해서 자산이 변동됩니다.
    + 인출은 Kash Controller에 의해서만 가능합니다.
    + 함수 목록
        + getAssetList() external view returns (address[])
        + getAssetBalance(address asset) external view returns (uint256)
        + getAssetTotalValue(address quoteCurrency) external view returns (uint256)
        + withdraw(address asset, uint256 amount, address to) external onlyRole(VAULT_CONTROLLER_ROLE)
        + emergencyWithdraw(address asset, uint256 amount, address to) external onlyRole(MASTER_ADMIN_ROLE)

+ vRWA Settler
    + 유동성 자산을 볼트에 보관하여 vRWA의 청산을 진행하는 컨트랙입니다.
    + 혹은 사고시 보험 풀로부터 KASH을 수령하여 vRWA의 청산을 진행합니다.
    + 함수 목록
        + settle(uint256 settleAmount, address[] assets, uint256[] amounts) external onlyRole(SERVICE_ADMIN_ROLE)
            + emit vRWASettled(uint256 settleAmount, uint256 settledByAsset, uint256 settledByInsurace)
            + emit vRWASettledByAsset(uint256 settledByAsset, address[] assets, uint256[] amounts)
            + emit vRWASettledByInsurance(uint256 settledByInsurace, uint256 claimedKASH)

+ Insurance Vault
    + vRWA가 예정대로 청산 되지 못한 때를 위한, 보험 용도의 KASH 보관소입니다.
    + vRWA Settler에 의해 호출되어 실현해야 하는 가치만큼의 KASH를 내어줍니다.
    + 함수 목록
        + getBalance() external view return (uint256)
        + fund(uint256 amount) external onlyRole(KASH_ISSUER_ROLE)
            + emit funded(address from, uint256 amount)
        + claim(address to, uint256 amount) external onlyRole(VRWA_SETTLER_ROLE)
            + emit claimed(address by, address to, uint256 amount)
            + 잔액 부족시 Team Vault에서 accidentClaim 수행

+ Kash Issuer
    + KASH 토큰을 발행할 수 있는 권한을 전담하는 컨트랙트입니다.
    + Reserve Vault에 vRWA등 담보를 예치하는 조건으로 KASH 발행이 가능합니다.
    + 함수 목록
        + mint(address to, uint256 amount, address collateral) public onlyRole(SERVICE_ADMIN_ROLE)
            + emit minted(address to, uint256 amount, address collateral, uint256 collateralAmount)
            + 내부적으로 kash oracle을 참조, 발행에 필요한 collateralAmount을 계산한다
            + 우선 1기에서는 서비스 어드민만 vRWA 발행을 바탕으로 통화량을 조절한다
    <!-- + vRWA Settler 요청에 의해 청산 실패시 KASH의 소각을 진행합니다. -->

+ Vault Controller
    + Reserve Vault에서 자산을 인출할 수 있는 유일한 컨트랙입니다.
    + 기본적으로 KASH의 가치를 유지하면서 발행 및 소각을 위해 자산을 움직입니다.
    + RBS Escrow에 한하여 Reserve Vault의 자산을 운용할 수 있는 권한을 가집니다.
    + 함수 목록
        + escrow(bytes32 marketID, address asset, uint256 amount) external onlyRole(ESCROW_FACTORY_ROLE)
            + emit lend(bytes32 marketID, address asset, uint256 amount)
        + settleByAsset(uint256 settleAmount, address[] assets, uint256[] amounts) external onlyRole(VRWA_SETTLER_ROLE)
        + settleByInsurace(uint256 settleAmount, uint256 kashAmount) external onlyRole(VRWA_SETTLER_ROLE)
        + exercisePCR(address exerciser, address asset, uint256 amount) external onlyRole(PCR_MANAGER_ROLE)
        <!-- + redeem(address to, uint256 kashAmount, address asset) external onlyRole(KASH_ISSUER_ROLE)
            + emit redeemed(address to, uint256 kashAmount, address asset, uint256 redeemAmount)
            + 1기에서는 redeem 불가 -->

+ RBS Escrow Factory
    + RBS 운영을 위해 리저브 볼트에서 자산을 차용하는 컨트랙입니다. 
    + 개별 채권 시장에 대한 Instance 팩토리 역할을 합니다.
    + 함수 목록
        + getLoaned(address asset) external view returns (uint256);
        + getLoanedTotalValue(address quoteCurrency) external view returns (uint256);
        + getInstanceList() external view returns (address[]);
        + createEscrow(bytes32 marketID, address asset, uint256 amount) returns (address instanceAddress) onlyRole(BOND_ISSUER_ROLE)
            + emit escrowCreated(bytes32 marketID, address asset, uint256 amount, address instanceAddress)
        
+ RBS Escrow Instance
    + 차용 받은 자산 및 매수한 KASH를 보관하는 곳입니다.
    + 차용한 자산 및 현재까지 사용된 자산, 매수된 KASH 등의 정보가 포함됩니다.
    + 함수 목록
        + claimAsset(uint256 amount) onlyRole(BOND_MARKET_ROLE)
        + depositKASH(uint256 amount) onlyRole(BOND_MARKET_ROLE)
        + closeEscrow(bytes32 marketID) onlyRole(BOND_ISSUER_ROLE)
            + emit escrowClosed(bytes32 marketID, uint256 returnedAsset, uint256 boughtKASH)
            + selfDestruct


---

# Staking Group

+ Staking Pool
    + 사용자가 KASH를 예치하고 스테이킹 보상을 받는 핵심 컨트랙트입니다.
    + 지분(Share) 발행, 보상 계산, DCR을 활용한 가상 지분(Virtual Share) 관리 기능을 포함합니다. 
    + 풀별로 독립적으로 배포되어 운영됩니다.
    + 함수 목록
        + getSharePrice() external view returns(uint256)
        + mintShare(uint256 kashStakeAmount, uint256 dcrExerciseAmount) external
        + burnShare(uint256 shareAmount) external
        + updateEpoch() external
        + exercisePCR() external
            + 예치 원금만큼 부채 생성 및 원금 반환
            + PCR Manager의 exercisePCR 호출

+ Staking Reward Distributor
    + 스테이킹을 위해 할당된 KASH 총 보상량을 보관합니다.
    + 각 Staking Pool의 요청에 따라 Strategy에 정의된 로직대로 Epoch 보상을 지급합니다.
    + 함수 목록
        + addStakingPool(address pool, address strategy, uint256 allocateAmount) external onlyRole(SERVICE_ADMIN_ROLE)
        + claimEpochReward() external onlyRole(STAKING_POOL_ROLE)

+ Reward Strategy
    + 각 스테이킹 풀별로 독립 배포되어 Epoch 정보 및 보상 식 등 정책을 저장합니다.
    + 현재 Epoch 계산, Epoch별 보상량 등 보상 계산을 위한 함수를 제공합니다.
    + 함수 목록
        + getEpochStart() external view returns(uint256)
        + getEpochDuration() external view returns(uint256)
        + calculateCurrentEpoch(uint256 timestamp) external view returns(uint256)
        + calculateEpochReward(uint256 epoch) external view returns(uint256)
    
+ Reservation Pool
    + 스테이킹 풀의 예치 한도 초과 시 사용자들이 예치를 예약하는 컨트랙입니다.
    + 내부 큐를 통해 순서대로 참여할 수 있도록 지원합니다.
    + 함수 목록
        + getReservation(uint256 reservationID) external view returns(Reservation)
        + getQueuePos() external view returns (uint256)
        + getQueueLength() external view returns (uint256)
        + reserve(address pool, uint256 amount) external
        + process() external

---

### Stabilization Group

+ Kash Appraiser
    + FV, IV, DFV, DIV 등 KASH의 가치 지표를 계산합니다.
    + 일부 로직은 오프체인 계산 후 온체인 파라미터로 반영될 수도 있습니다.
    + 함수 목록
        + getAppraisedValue(bool intrinsic, bool discount) external view returns(uint256)
        + manualUpdateValue(bytes32 key, uint256 value) external OnlyRole(SERVICE_ADMIN)

+ Bond Issuer
    + 신규 채권 시장을 생성합니다.
    + 매수 채권 시장을 만들기 위해 RBS Escrow Factory를 통해 새 Escrow 인스턴스를 만듭니다.
    + 매도 채권 시장을 만들기 위해 Treasury에서 KASH를 가져와 Market에 지급합니다.
    + 초기에는 수동으로 운영되며 점차 발행 조건등이 온체인 로직으로 구체화됩니다.
    + 추후에는 누구나 호출하여 조건을 만족하는 경우 시장을 개설할 수 있도록 목표합니다.
    + 함수 목록
        + getActiveMarkets() external view returns(address[])
        + issueMarket(IssueMarketData marketData) onlyRole(SERVICE_ADMIN)
        + IssueMarketData : structure(uint256 marketType, uint256 amount, address asset, uint256 priceStart, uint256 priceDecay, uint256 priceLimit, uint256 vestingPeriod, uint256 marketOpen, uint256 marketDuration)

+ Bond Market Instance
    + KASH 매수/매도를 위한 개별 채권 시장입니다.
    + 매도시 Treasury로부터 KASH를 직접 조달받고 결과 자산은 시장 종료시 Treasury로 반환합니다.
    + 매수시 매 거래마다 Escrow Instance를 자금원으로 하며 매수한 KASH는 즉시 인스턴스로 이동합니다.
    + 함수 목록
        + getCurrentPrice() external view returns(uint256)
        + buyBond(uint256 payAmount, uint256 returnMinimum) external
        + closeMarket() external onlyRole(SERVICE_ADMIN)

+ Treasury Vault
    + PoL을 위한 판매용 KASH 및 PoL 자산(LP)을 보관합니다.
    + 현재로서는 초기에 KASH를 할당 받은 이후 별도 보충 수단이 없습니다.
    + 따라서 KASH는 점감하며 PoL로 점차 변환됩니다.
    + 함수 목록
        + fundMarket(address market, uint256 amount) onlyRole(BOND_ISSUER_ROLE)
        + withdrawAsset(address asset, uint256 amount) onlyRole(SERVICE_ADMIN_ROLE)

---

### Sales Group

+ Sales Market
    + 지정된 자산(예: 스테이블코인, KAIA)을 받고 KASH를 판매하는 Fixed-ratio swap 컨트랙입니다.
    + 판매 정보(결과)를 DCR Manager에 전달합니다.
    + 판매로 받은 자산은 Service Admin Multisig로 우선 전달 후 용도에 따라 사용
    + 함수 목록
        + getPrice(address asset) external view returns(uint256)
        + addPair(address asset, uint256 price) external onlyRole(SERVICE_ADMIN)
        + buyKASH(address asset, uint256 payAmount, uint256 minimumResult) external
        + closeMarket(address salesVault) external onlyRole(SERVICE_ADMIN)

+ Sales Vault
    + 세일즈를 위해 할당된 KASH 보관처입니다.
    + 세일즈 개시시에 수동으로 각 Sales Market에 필요한 만큼 전송됩니다.
    + 함수 목록
        + fundMarket(address market, uint256 amount) onlyRole(SERVICE_ADMIN)

+ PCR Manager
    + 원금 회수 권리 행사를 위한 컨트랙입니다.
    + 세일즈 참여시 구매 원금을 기록합니다.
    + 함수 목록
        + tokenSold(address buyer, uint256 amount) external onlyRole(SALES_MARKET_ROLE)
        + exercisePCR(address exerciser) external onlyRole(STAKING_POOL_ROLE)
            + 풀에서 반환된 KASH 소각, Vault Controller의 exercisePCR 호출

+ DCR Manager
    + DCR(Debt Creation Right)의 발급 및 사용을 관리합니다. 
    + DCR은 영구적인 요소가 아니기 때문에 토큰 대신 내부 회계로 처리합니다.
    + 세일즈 컨트랙트와 연동하여 참여 시점에 따른 EPB를 계산하고 DCR 정보를 기록합니다.
    + 함수 목록
        + getUserData(address user) external view returns(UserData)
        + tokenSold(address buyer, uint256 amount) external onlyRole(SALES_MARKET_ROLE)
        + exerciseDCR(address user, uint256 amount) external onlyRole(STAKING_POOL_ROLE)
        + UserData : structure(uint256 totalBoughtKASH, uint256 totalEarnedDCR, uint256 spentDCR, uint256 maxLeverage)

+ DCR Strategy
    + 세일즈 종류에 따라 발급할 DCR 수량을 결정하는 수식을 포함한 참조 컨트랙입니다.
    + 함수 목록
        + setVariable(bytes32 key, uint256 value) external onlyRole(SERVICE_ADMIN)
        + calculateDCR(uint256 soldKASH, uint256 buyingKASH) external returns (uint256)

---

### Governance Group

+ Price Oracle
    + 금 가격, KASH 시장 가격 등 운영에 필요한 데이터를 관리합니다. 
    + 초기에는 해킹 리스크를 피하기 위해 거버넌스로부터 직접 입력받아 관리됩니다.
    + vRWASettler, Kash Controller, KashAppraiser 등지에서 참조됩니다.
    + 추후 Proof of Reserve를 위한 정보도 여기에 담깁니다. 
    + 함수 목록
        + getKeyList() external view returns(Store[])
        + getValueUint256 (bytes32 key, uint256 staleLimit) external view returns(uint256)
        + setValueUint256 (bytes32 key, uint256 value) external onlyRole(SERVICE_ADMIN_ROLE)
        + Store : structure(bytes32 key, string memory name, uint256 type, uint256 lastUpdate)

+ Parameter Store
    + 서킷 브레이크등 전역적으로 영향을 미치는 설정 값들이 저장됩니다.
    + 거버넌스에 의해 설정됩니다.
    + 함수 목록
        + getKeyList() external view returns(Store[])
        + getValueUint256 (bytes32 key) external view returns(uint256)
        + setValueUint256 (bytes32 key, uint256 value) external onlyRole(SERVICE_ADMIN_ROLE)
        + Store : structure(bytes32 key, string memory name, uint256 type, uint256 lastUpdate)

+ Access Manager
    + 프로토콜 내 컨트랙 전반에 권한을 갖는 주소 관리를 수행하는 컨트랙입니다.
    + AccessControlEnumerable을 이용하여 구현됩니다.
    + 함수 목록
        + hasRole(address who, bytes32 role) external view returns(bool)
        + grantRole(address who, bytes32 role) external onlyRole(ROLE_GRANTER_ROLE)
        + ROLE_GRANTER_ROLE : (ROLE==MASTER_ADMIN || ROLE==SERVICE_ADMIN) ? MASTER_ADMIN_ROLE : SERVICE_ADMIN_ROLE

+ Multisig Safe
    + KASH는 현실의 금광과 긴밀하게 연결된 프로젝트의 특수성으로 인해 재단에 의해 직접 운영됩니다.
    + DAO를 통한 거버넌스 운영은 아직 계획되어 있지 않습니다. 
    + 거버넌스 활동은 다음과 같은 멀티시그 계정에 의해 수행됩니다.
        + Master Admin : KAIA재단, KASH재단, 신탁회사 세 곳이 나눠가진 콜드 월렛의 2 of 3 멀티시그입니다. 프로젝트의 가장 중요한 작업 및 Service Admin 관리 권한을 갖습니다.
        + Service Admin : KASH 재단 내부 핫 월렛의 2 of 3 멀티시그입니다. 서비스의 일반적인 운영을 위한 권한 및 비상시 운영 중지 권한을 가집니다. 세일즈 이전, 프로젝트 초기 세팅시에 한해 Master admin role 권한도 갖습니다.

+ Team Vault
    + 팀의 수익 실현을 위한 KASH를 보관하는 컨트랙입니다.
    + 3년간 인출이 불가하며 이후 지정된 계정이 인출 가능합니다.
    + 청산 사고 발생시 예외적으로 소각을 위한 인출이 가능합니다.
    + 함수 목록
        + claim(address to, uint256 amount) external onlyRole(TEAM_MEMBER_ROLE)
            + amount가 0인 경우 가능액 모두 인출
            + 각 주소 할당량은 지분 형태로, 보험 사고로 인해 총량이 줄어들면 동일한 비율로 감소
        + accidentClaim(address to, uint256 amount) external onlyRole(INSURANCE_VAULT_ROLE)

+ Operation Vault
    + 팀의 운영 비용 충당을 위한 KASH를 보관하는 컨트랙입니다.
    + Service Admin에 의해 출금 가능합니다.
    + 함수 목록
        + withdraw(uint256 amount) external onlyRole(SERVICE_ADMIN_ROLE)

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