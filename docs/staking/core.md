---
id: core
sidebar_position: 1
---

# Core Principles

KASH 스테이킹 메커니즘은 다음과 같은 핵심 개념을 근간으로 설계되었습니다.

---

### Staking Pool

KASH 1차 생태계에서, 스테이킹 보상을 위해 할당된 KASH는 스테이킹 리워드 볼트에 미리 분배되어 있습니다. 이는 프로토콜의 전략에 따라 여러 차례에 걸친 별도의 스테이킹 풀에 나뉘어 분배될 수 있습니다.

+ 각 스테이킹 풀마다 보상 총량, 보상 주기, 예치 제한, 특별한 시스템 등이 별도로 설정될 수 있습니다.
+ 각 풀끼리는 서로 독립된 관계로, 각 풀의 보상은 해당 풀 내에 예치한 유저를 대상으로 하여 분배됩니다.
+ 예치할 풀을 선택하는 것에는 기본적으로 제한이 없지만, 예치량이 제한된 풀에는 스테이킹이 어려울 수 있습니다.
+ 또한 다른 풀에 예치하기 위해 예치를 철회하면서 기존의 지위(EPB 등)를 상실할 수 있습니다.

---

###  Epoch

KASH의 스테이킹 보상은 실시간, 연속적으로 발생하는 것이 아니라 에포크(Epoch) 라고 하는 미리 정의된 시간 주기에 따라 분배됩니다. 각 에포크가 종료되는 시점에, 해당 에포크 동안 발생한 총 보상이 계산되어 스테이킹 참여자들에게 할당됩니다.

+ Genesis Timestamp
    + 스테이킹 풀이 생성되는 즉시 보상 분배가 시작되는 것은 아닙니다. 제한된 예치량에 대한 선점 등 스테이킹의 시점에 따른 이점을 확보하기 위해서 미리 스테이킹 할 수는 있지만, 실제 보상이 분배되는 Epoch는 그 이후에 시작할 수 있습니다.
    + $T_{open}$[^STAKING_POOL_OPEN] : 해당 스테이킹 풀이 오픈되어 예치 가능해지는 시점
    + $T_{start}$[^STAKING_EPOCH_START] : 해당 스테이킹 풀의 보상 분배가 시작되는 첫 Epoch 시작 시점 ($T_{open} \le T_{start}$)

+ Epoch Reward
    + 각 에포크에 분배될 보상액은 에포크마다 성장률($g$)을 적용하여 점진적으로 증가하도록 설계되었습니다. 이는 초기 생태계를 보다 안정화하고 장기적인 참여를 독려하기 위함입니다. 
    
    + $N_{epochs}$ : 해당 풀의 전체 스테이킹 기간 동안 총 에포크 수
        $$
        N_{epochs} = \frac{Duration_{pool}}{Duration_{epoch}}
        $$
        + $Duration_{pool}$[^STAKING_TOTAL_DURATION]: 해당 풀의 전체 스테이킹 기간.
        + $Duration_{epoch}$[^STAKING_EPOCH_DURATION]: 해당 풀의 에포크 주기.

    + $Reward_{base}$[^STAKING_REWARD_BASE] : 풀의 보상 총액과 성장률로부터 첫 번째 에포크에 분배될 기준 보상액을 결정합니다.
        $$
        Reward_{base} = 
        \begin{cases}
            (Reward_{Total} \times g) / ((1 + g)^{N_{epochs}} - 1) & (g \gt 0) \\
            Reward_{Total} / N_{epochs}  & (g = 0)
        \end{cases}
        $$
        + $Reward_{Total}$[^STAKING_REWARD_TOTAL]: 해당 스테이킹 풀에 분배된 토큰의 총량.
        + $g$[^STAKING_REWARD_GROWTH]: 에포크별 보상 성장률.

    + $Reward_{Epoch}$: $k$번째 에포크에 분배될 총 보상은 다음과 같습니다.
        $$
        Reward_{Epoch,k} = Reward_{base} \times (1 + g)^{k-1} \quad (1 \le k \le N_{epochs})
        $$

---

### Epoch Reward Graph

현재 Early Staking Pool에 사용되는 g=0.05일 때 각 epoch별 보상량 및 수익률의 그래프는 다음과 같습니다.

![KASH Epoch Reward Graph](/img/kash_epoch_rewards.png)

+ total 36 epoch, total reward = 1로 설정 하였습니다.

---

### Staking Reward

스테이킹에 대한 증명과 보상을 수령하는 원리는, 전체 풀에 대한 자신의 지분(Share) 개념으로 구현됩니다. 유니스왑의 LP토큰과 유사한 원리입니다.

+ Share : 스테이킹 풀에 대한 지분입니다.
    $$
    Share_{earn} = Deposit / Price_{share}
    $$
    + $Deposit$ : 예치하려는 KASH 토큰의 개수입니다.
    + $Price_{share}$ : 진입 시점 지분 하나의 가치입니다. (KASH/share)
    + $Share_{earn}$ : 예치액에 대해 받게되는 지분의 개수입니다.

+ Share Price : 현재 각 지분 하나가 나타내는 가치입니다. 진입시나 청산시에 이 가격을 기준으로 KASH와 교환됩니다.
    $$
    Price_{share} = \frac{(\sum Principle_{\text{All users}} + \sum Reward_{\text{All epochs}})}{\sum Shares_{\text{All users}}}
    $$
    + $\sum Principle_{\text{All users}}$ : 스테이킹한 유저들의 원금 총액입니다.
    + $\sum Reward_{\text{All epochs}}$ : 스테이킹 풀에 실현된 보상 총량입니다.
    + $\sum Shares_{\text{All users}}$ : 스테이킹 풀 내 모든 유저들의 지분 합계입니다.

+ Staking Reward
    + 스테이킹의 보상은 풀 내 각 지분에 대해 고르게 분배됩니다. 풀에 전체 보상이 쌓이면 지분의 가치가 상승하면서 반영됩니다.
    $$
    Reward_{share} = \frac{Reward_{Epoch,k}}{\sum Shares_{\text{All users}}} = Price_{share, new} - Price_{share, old}
    $$
    + 따라서 개별 사용자의 보상은 다음과 같습니다.
    $$
        Reward_{user} = \frac{Reward_{Epoch,k}}{\sum Shares_{\text{All users}}} * Shares_{user}
    $$

---

다음 섹션에서는 이러한 스테이킹의 기본적인 틀 위에 추가된, 초기 참여자를 위한 요소를 설명합니다.

---

[^STAKING_POOL_OPEN]: 각 Staking Pool 컨트랙트 상의 변수명 STAKING_POOL_OPEN. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
[^STAKING_EPOCH_START]: 각 Reward Strategy 컨트랙트 상의 변수명 STAKING_EPOCH_START. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
[^STAKING_TOTAL_DURATION]: 각 Reward Strategy 컨트랙트 상의 변수명 STAKING_TOTAL_DURATION. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
[^STAKING_EPOCH_DURATION]: 각 Reward Strategy 컨트랙트 상의 변수명 STAKING_EPOCH_DURATION. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
<!-- [^STAKING_REWARD_GROWTH]: 스마트 컨트랙트 상의 변수명 STAKING_REWARD_GROWTH. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능 -->
[^STAKING_REWARD_BASE]: 실제로는 풀 생성 시점에 g값에 따라 미리 계산되어 할당됩니다. 각 Reward Strategy 컨트랙트 상의 변수명 STAKING_REWARD_BASE. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
[^STAKING_REWARD_TOTAL]: Reward Distributor 컨트랙트 상의 변수명 STAKING_REWARD_TOTAL. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능
[^STAKING_REWARD_GROWTH]: 각 Reward Strategy 컨트랙트 상의 변수명 STAKING_REWARD_GROWTH. [Appendix](/appendix/constants)에서 각 스테이킹 풀의 값 확인 가능