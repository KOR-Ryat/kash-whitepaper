---
id: architecture
sidebar_position: 1
draft: true
---

# Contract Architecture

KASH 프로젝트 전반의 컨트랙 설계
1. 특별히 명시되지 않은 경우 UUPS Upgradable
2. 최소한의 효율성을 유지하는 레벨에서 기능 단위 모듈화
3. 

---

KASH 스테이킹을 구성하는 요소는 크게 다음 세가지로 구성됩니다. 

+ DCR Manager : DCR 관리를 수행하는 주체입니다. DCR 잔액, 세일즈 정보 등을 담고 있습니다.
+ Staking Pool : 유저가 실제 예치, 해지 등 상호작용을 수행하는 대상이 되는 스테이킹 풀입니다.
+ Reward Distributor : 여러 스테이킹 풀에 보상으로 분배하기 위해 할당된 KASH 보관처입니다.

이 컨트랙트간의 동작 플로우는 다음과 같습니다.

+ DCR
    + 유저가 세일즈에 참여하면, 이 정보를 DCR Manager에게 알립니다.
    + DCR Manager는 구매 수량 등의 참여 정보를 바탕으로 DCR을 발급합니다.
    + Staking Pool에 예치시 DCR을 행사하는 경우 DCR Manager에게 질의합니다.
    + DCR 잔량, 최대 레버리지 등을 응답받아 유효성 검사를 수행, 예치합니다.

+ Reward
    + 임의 유저는 에포크 주기가 지나면 Staking Pool의 updateEpoch를 실행할 수 있습니다.
    + 이 함수는 Distributor에게 보상 분배를 요청합니다.
    + Distributor는 Epoch 경과 여부를 검증하고 보상량을 계산하여 전송합니다.



+ Sales Market
    + 마켓별 별도의 컨트랙으로 배포됩니다.
    + 지정된 ERC20 및 KAIA를 수취하고 KASH 토큰을 지정된 교환비로 판매합니다.
    + ServiceAdmin에 의해 ServiceStop이 가능합니다. - 토큰 판매 금지
    + ServiceAdmin에 의해 잔액이 이동 가능합니다.
+ DCR Strategy
    + 마켓별 별도의 컨트랙으로 배포됩니다.
    + 마켓별 산식에 따라 발급할 DCR 수량을 계산하는 로직입니다.
+ DCR Manager
    + 단일 컨트랙입니다.
    + 마켓의 요청에 따라 DCR을 발급, 관련 정보를 통합 관리합니다.
    + 스테이킹 풀에서 참조할 수 있도록 정보를 제공합니다.
+ Staking Pool
    + 스테이킹 풀마다 별도의 컨트랙으로 배포됩니다.
    + 실제 예치를 받고 지분을 발급, 계산하는 주체입니다.
    + Reservation Pool에 대기열이 존재하는 경우 직접 예치할 수 없습니다.
    + 임의 사용자에 의해 updateEpoch가 호출되어 distributor에 보상을 요청합니다.
        + 기본적으로는 재단측 keeper에 의해 주기적으로 호출됩니다.
    + MasterAdmin에 의해 EmergecyStop이 가능합니다. - Epoch update, 출금 정지
    + Time-locked MasterAdmin에 의해 EmergecyTransfer가 가능합니다.
+ Reservation Pool
    + 단일 컨트랙입니다.
    + 예약을 관리하고 예치를 수행하는 컨트랙입니다.
    + 스테이킹 풀마다 우선순위 대기열 (있는 경우), 일반 대기열이 존재합니다.
    + 임의 사용자에 의해 activateReservation이 호출되어 stake를 시도합니다.
        + 대기열 제일 앞에 있는 사용자부터 n명에 대해서만 실행 가능합니다.
        + 기본적으로는 재단측 keeper에 의해 주기적으로 호출됩니다.
    + ServiceAdmin에 의해 ServiceStop이 가능합니다. - 추가 예치 금지
    + Time-locked MasterAdmin에 의해 잔액이 이동 가능합니다.
+ Staking Reward Distributor
    + 단일 컨트랙입니다.
    + 스테이킹에 할당된 KASH 전체가 보관되는 장소입니다.
    + 스테이킹 풀별로 내부 회계상 KASH 수량을 할당하여 잔액을 관리합니다.
    + 각 epoch 경과 여부, epoch에 분배할 물량 등은 strategy로 검사합니다.
    + 개별 스테이킹 풀에 의해 distributeEpochReward()가 호출됩니다.
    + ServiceAdmin에 의해 ServiceStop이 가능합니다. - 보상 분배 금지
    + ServiceAdmin에 의해 잔액이 이동 가능합니다.
+ Staking Reward Strategy
    + 스테이킹 풀마다 별도의 컨트랙트로 배포됩니다.
    + distributor가 staking pool의 요청을 올바르게 확인하고 보상을 분배할 수 있게 합니다.
    + epoch 시작시간, 최대 epoch, 성장률 g 등이 기록됩니다.
    + 다음 epoch 시간, epoch reward를 계산하는 수식도 포함합니다.